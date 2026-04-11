# Настройка VPS с сервером XRAY

## Первоначальная настройка VPS
Везде `@ip` означает, что надо подставить свой IP. То же самое касается `user`, если вы хотите использовать другое имя пользователя.

### Добавление пользователя и смена пароля рута 
```
ssh root@ip
useradd -m user
passwd user
usermod -aG sudo user #Add to sudoers
```
```
ssh user@ip
passwd root
```

### Настройка доступа SSH по сертификату
#### Создание и копирование ключей

В терминале своего компьютеара:
1. Проверить наличие ssh клиента:
```
ssh
```
Если не найден, в Windows включить: Win+I - Manage optional features - включить OpenSSH client.

2. Создать пару ключей (принять дефолты, сгенерировать и сохранить парольную фразу). Файлы будут сохранены в %userprofile%\.ssh.
```
ssh-keygen -t rsa
```
3. Скопировать ключи на сервер:
```
cat ~/.ssh/id_rsa.pub | ssh user@ip "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

#### Подключение к VPS по сертификату
**Примечание**. В Windows должна быть папка **.ssh** в корне профиля с файлами **id_rsa.pub** и **id_rsa**. 

```
ssh -i "$env:userprofile\.ssh\id_rsa" user@ip
```

### Отключение парольного доступа
**Важно!** Только после того, как настроен и проверен доступ по сертификату.

```
sudo nano /etc/ssh/sshd_config
```

Найти **passwordauthentication** и установить **No**

```
sudo reboot
```

### Обновление и установка нужных пакетов
curl и ufw могут быть установлены в Ubuntu

```
sudo apt-get update && sudo apt-get upgrade
sudo apt install curl
sudo apt install ufw -y
sudo apt install net-tools -y
```

### Настройка файервола

```
sudo ufw enable
sudo ufw allow 22 #ssh
sudo ufw allow 443 #xray
sudo ufw reload
sudo ufw status numbered
```

## Установка и настройка сервера XRAY

1. Определить последнюю стабильную версию: [https://github.com/XTLS/Xray-core/releases/](https://github.com/XTLS/Xray-core/releases/)

2. Подставить номер версии в команду установки вместо 26.2.6
```
sudo bash -c "$(curl -L https://raw.githubusercontent.com/XTLS/Xray-install/046d9aa2432b3a6241d73c3684ef4e512974b594/install-release.sh)" @ install --version 26.2.6
```
3. Включить сервер
```
sudo systemctl enable xray
```
4. Сгенерировать пару ключей и short ID
```
/usr/local/bin/xray x25519 #key pair
openssl rand -hex 8 #shortid
```
5. Сгенерировать UUID - лучше создавать свой для каждого человека
```
/usr/local/bin/xray uuid #uuid
```
6. Создать конфигурационный файл (пример ниже)
```
sudo nano /usr/local/etc/xray/config.json
```
Вставить туда содержимое файла и сохранить Ctrl+X.

7. Запустить сервер
Команда перезапускает сервер, отображает статус и отслеживает лог.
```
sudo systemctl restart xray && sudo systemctl status xray && sudo journalctl -u xray -f
```
### Конфигурационный файл сервера
Пример файла для VLESS XTLS REALITY. В нем необходимо прописать:
- приватный ключ сервера из шага 4 выше
- Short ID из шага 4 выше
- UUID каждого клиента (пользователя) из шага 5 выше
- любые адреса e-mail каждого клиента (необязательно, но они могут упростить анализ логов и/или маршрутизацию)
- SNI - адрес легитимного сервера, под который будет маскироваться ваш сервер. Это должен быть крупный домен в стране сервера. Для оптимальной скорости - размещенный на том же сервере, что и VPS. Сканирование можно выполнить с помощью [RealiTLScanner](https://github.com/XTLS/RealiTLScanner/releases): `.\RealiTLScanner-windows-64.exe -addr <VPS IP>`


Здесь базовый вариант с единственной [зарубежной] VPS. Более сложные конфигурации с цепочкой могут быть рассмотрены позже. 

_скоро_
