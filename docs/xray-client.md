## Настройка клиентов XRAY

### Загрузка и установка приложений

#### Android
[https://github.com/2dust/v2rayNG/releases/](https://github.com/2dust/v2rayNG/releases/)

1. Выбрать Latest, не pre-release
2. В подразделе Assets выбрать файл APK с universal в имени.
3. Скачать, установить.

<img src="v2ray-client-download.png" alt="Screenshot" style="width: 40%; height: auto;">


#### Windows
[https://github.com/2dust/v2rayN/releases](https://github.com/2dust/v2rayN/releases)


#### iOS
[Приложение «OneXray» — App Store](https://apps.apple.com/ru/app/onexray/id6745748773)

### Импорт конфигурации в приложение с помощью ссылки

1. Скопировать присланную ссылку вида VLESS:// в буфер обмена.
2. В приложении нажать ➕, затем Импорт из буфера обмена.

### Настройка проксирования приложений (только Android)
1. Меню ≡  - Выбор приложений - Использовать выбор приложений: включить
2. Выбрать из списка приложения, которые должны ходить через сервер.

<img src="v2rayNG-apps.png" alt="screenshot" width="50%" height="50%">

### Настройка маршрутизации
Наряду с проксированием приложений можно настроить их более тонкое поведение. Например, браузер будет ходить на сайты .RU и .РФ через прокси, а на все остальные напрямую. 

При этом можно пускать отдельные сайты в зоне .RU через прокси, если они заблокированы. И наоборот ходить на конкретные зарубежные сайты напрямую.

Именно так настроены некоторые правила в примере ниже.

Павила применяются по порядку. сначала применяется первое, затем второе и так далее.

#### Импорт правил маршрутизации
Здесь пример набора правил
1. Скопировать набор правил в буфер обмена
```
[{"enabled":true,"locked":true,"outboundTag":"direct","protocol":["bittorent"],"remarks":"Torrent - direct"},{"enabled":true,"ip":["geoip:private"],"locked":true,"outboundTag":"direct","remarks":"geoip:private - direct "},{"domain":["geosite:private"],"enabled":true,"locked":true,"outboundTag":"direct","remarks":"geosite:private - direct "},{"enabled":false,"ip":["1.0.0.1","1.1.1.1","8.8.8.8","8.8.4.4"],"locked":true,"outboundTag":"proxy","remarks":"DNS - proxy"},{"domain":["720pier.ru"],"enabled":true,"locked":true,"outboundTag":"proxy","remarks":"RU - Proxy"},{"domain":["reddit.com","nytimes.com"],"enabled":true,"locked":true,"outboundTag":"direct","remarks":"My Domains - direct"},{"domain":["domain:ru","domain:xn--p1ai","ya.ru"],"enabled":true,"locked":true,"outboundTag":"direct","remarks":"RU, РФ - direct"},{"enabled":true,"locked":true,"outboundTag":"proxy","port":"0-65535","remarks":"All other - proxy"}]
```

2. Меню ≡ - Маршрутизация - ︙(в правом верхнем углу) - Импорт правил из буфера обмена. Согласиться на удаление существующих правил.







