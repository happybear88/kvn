# Первоначальная настройка VPS

В этом документе описаны рекомендуемые действия сразу после приобретения VPS.

- [Управление пользователями](#управление-пользователями)
  - [Добавление пользователя](#добавление-пользователя)
  - [Смена пароля рута](#смена-пароля-рута)
- [Исправление вставки правой кнопкой мыши в терминале](#исправление-вставки-правой-кнопкой-мыши-в-терминале)
- [Настройка доступа SSH посредством пары ключей](#настройка-доступа-ssh-посредством-пары-ключей)
  - [Создание и копирование ключей](#создание-и-копирование-ключей)
  - [Подключение к VPS с приватным ключом](#подключение-к-vps-с-приватным-ключом)
- [Отключение парольного доступа](#отключение-парольного-доступа)
- [Обновление и установка нужных пакетов](#обновление-и-установка-нужных-пакетов)
- [Настройка файервола](#настройка-файервола)
- [Прочие укрепления безопасности](#прочие-укрепления-безопасности)


**Примечание**. Везде `@ip` означает, что надо подставить свой IP. То же самое касается `happybear`, если вы хотите использовать другое имя пользователя.

## Управление пользователями

### Добавление пользователя
Чтобы не работать под рутом. 
```
ssh root@ip
useradd -m happybear
passwd happybear
usermod -aG sudo happybear #Add to sudoers
exit
```

### Смена пароля рута
```
ssh happybear@ip
sudo passwd root
```

## Исправление вставки правой кнопкой мыши в терминале
Всегда можно вставлять по Shift+Ins, но если вставлять правой кнопкой мыши, может быть ерунда. Лечится так:

```
ssh happybear@ip
sudo chsh -s /bin/bash $(whoami) #terminal fix
exit
```

## Настройка доступа SSH посредством пары ключей
Это надежно и безопасно. 

### Создание и копирование ключей

В терминале своего компьютера:
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
cat ~/.ssh/id_rsa.pub | ssh happybear@ip "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Подключение к VPS с приватным ключом
**Примечание**. В Windows должна быть папка **.ssh** в корне профиля с файлами **id_rsa.pub** и **id_rsa**. 

```
ssh -i "$env:userprofile\.ssh\id_rsa" happybear@ip
```

## Отключение парольного доступа
**Важно!** Только после того, как настроен и проверен доступ по сертификату.

```
sudo nano /etc/ssh/sshd_config
```

В конце файла вставить:
```
PasswordAuthentication no
KbdInteractiveAuthentication no
ChallengeResponseAuthentication no
UsePAM no
AuthenticationMethods publickey
PubkeyAuthentication yes
```

Проверить текущие разрешения:
```
sudo sshd -T | grep -i passwordauthentication
sudo sshd -T | grep -E 'password|kbd|challenge|pam|authentication'
```

В пределах одного файла последнее значение имеет приоритет. Если в других файлах значения не соответствуют заданным (например, `passwordauthentication no`), надо выявить файл, который может переопределяет конфигурацию. Продолжая пример с парольной аутентификацией:
```
sudo grep -r PasswordAuthentication /etc/ssh/
```

Например, при таком выводе:
```
/etc/ssh/sshd_config.d/60-cloudimg-settings.conf:PasswordAuthentication no
/etc/ssh/sshd_config.d/50-cloud-init.conf:PasswordAuthentication yes
/etc/ssh/sshd_config.ucf-dist:PasswordAuthentication no
```
переопределяет файл `50-cloud-init.conf`. Надо изменить значение в нем:

```
sudo nano /etc/ssh/sshd_config.d/50-cloud-init.conf
```

Перезапустить ssh:
```
sudo systemctl restart ssh
```

и проверить доступ к хосту извне: `ssh happybear@ip`. Должно быть сообщение `Permission denied (publickey)`.

## Обновление и установка нужных пакетов
curl и ufw могут быть установлены в Ubuntu.

```
sudo apt-get update && sudo apt-get upgrade
sudo apt install curl
sudo apt install ufw -y
sudo apt install net-tools -y
```

## Настройка файервола
Порт 22 для SSH, 443 для XRAY.

```
sudo ufw enable
sudo ufw allow 22 #ssh
sudo ufw allow 443 #xray
sudo ufw reload
sudo ufw status numbered
```

## Прочие укрепления безопасности
Смена порта SSH, fail2ban, etc. См. также [Как защитить свой VDS сервер: 53 000 попыток взлома за 5 дней
](https://habr.com/ru/companies/lansoft_career/articles/956730/)