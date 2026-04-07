# Настройка приложений для подключения к серверу XRAY


- Инструкции на этой странице рассчитаны на приложения, которые могут подключаться к серверу XRAY посредством VLESS XHTTP Reality. Но шаги подойдут и для других протоколов.

- Для каждой операционной системы выполнение всех шагов обязательно во избежание проблем.

- Если инструкции вызывают затруднения, обратитесь к подрастающему поколению 😎

<script src="https://cdn.jsdelivr.net/npm/@uzairfarooq/toc@1.3.2/dist/toc.min.js"></script>
<div id="toc"></div>
<script>
  Toc.init({
    outerWrapper: '#toc',
    header: '#',
    title: 'Содержание',
    auto: true,
    minimumHeadings: 1,
    scrollSmooth: true,
    scrollOffset: 0,
    scrollContainer: null,
    mobileOffset: 100,
    listClass: 'toc-list',
    listItemClass: 'toc-list-item',
    level1Class: 'toc-level-1',
    level2Class: 'toc-level-2',
    level3Class: 'toc-level-3',
    level4Class: 'toc-level-4',
    level5Class: 'toc-level-5',
    level6Class: 'toc-level-6',
    collapseState: 'active',
    collapseContainer: null,
    onlyHeadings: null,
    excludeHeadings: null,
    headerLabel: 'Содержание',
    headerClass: 'toc-header',
    headerHtml: null,
    generateId: null,
    onInit: null,
    onToggle: null,
    onScroll: null
  });
</script>

<style>
  #toc {
    position: sticky;
    top: 20px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin: 1rem 0;
  }
  
  #toc .toc-header {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 0.5rem;
  }
  
  #toc .toc-list {
    list-style: none;
    padding-left: 0;
  }
  
  #toc .toc-list-item {
    margin: 0.2rem 0;
  }
  
  #toc a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  #toc a:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    #toc {
      position: relative;
      top: 0;
      max-height: none;
      margin: 1rem -1rem;
      border-radius: 0;
    }
  }
</style>

## Как работает обход блокировок

- Трафик маскируется под крупный сайт (например, microsoft.com) и выглядит для цензора как обычный веб-серфинг.

- На Android можно настроить обход блокировок только для избранных приложений (Telegram, Instagram, YouTube). В Windows это возможно только для приложений, которые умеют ходить через прокси - например, браузер или Telegram (кроме звонков).

- С помощью правил маршрутизации настраивается тонкое поведение приложений (если сервер не переопредляет маршруты). Например, браузер будет ходить на заблокированные РКН сайты через прокси, а на все остальные - напрямую. Если зарубежный сайт блокирует пользователей из РФ, на него тоже можно ходить через прокси.
 
## Android

### Загрузка и установка

[https://github.com/2dust/v2rayNG/releases/](https://github.com/2dust/v2rayNG/releases/)

1. Выберите Latest, нежели pre-release
2. В подразделе Assets выбрерите файл APK с **universal** в имени.
3. Скачайте, установите.

<img src="v2ray-client-download.png" alt="Screenshot" style="width: 40%; height: auto;">

### Импорт конфигурации в приложение
Есть несколько способов: сканирование QR-кода, импорт ссылки и даже импорт подписки на серверы.

#### Импорт серверов с помощью ссылки
1. Скопируйте присланную ссылку вида VLESS:// в буфер обмена.
2. В приложении нажмите ➕, затем **Импорт из буфера обмена**.

#### Импорт серверов с помощью подписки
Посредством подписки можно импортировать несколько серверов в один прием, а также обновлять их список по запросу или  автоматически.

1. Скопируйте присланную вам веб-ссылку в буфер обмена.
2. В приложении нажмите Меню ≡ - **Группы** - измените группу **Default** или создайте новую и заполните поля:
  - **Название**: любое понятное вам
  - **URL (необязательно)**: вставьте ссылку из буфера обмена - для вас это обязательно! И нажмите ✔️.

3. В списке групп нажмите ↩️, чтобы добавить серверы из подписки.

<img src="v2rayn-groups.png" alt="Screenshot">

В дальнейшем вы можете обновлять список серверов из Меню ≡ - **Группы** - ↩️

### Управление состоянием подключения
Логично настроить только конкретные приложения, как описано ниже, после чего включить и не отключать. 

В Android приложение v2rayNG добавляет свою плитку в шторку. Нужно перейти в настройки шторки и перетащить приложение в начало списка. 
<img src="v2rayng-manage-state.png" alt="screenshot">

Короткое нажатие на плитку будет включать или отключать сервис, а долгое нажатие - открывать приложение.

### Выбор отдельных приложений
Чтобы только выбранные приложения ходили в обход блокировок:
1. Меню ≡ - **Выбор приложений** - **Использовать выбор приложений**: включить
2. Выберите из списка приложения, которые должны ходить через сервер. Если вам нужно посещать отдельные заблокированные сайты в браузере, выберите **не основной** браузер.

<img src="v2rayNG-apps.png" alt="screenshot">

### Добавление маршрутов
1. Скопируйте эти правила в буфер обмена:
```
[{"enabled":true,"locked":false,"outboundTag":"direct","protocol":["bittorent"],"remarks":"Торрент - напрямую"},{"enabled":true,"ip":["geoip:private"],"locked":false,"outboundTag":"direct","remarks":"Частные сети - напрямую"},{"domain":["geosite:private"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Частные домены - напрямую"},{"enabled":false,"ip":["1.0.0.1","1.1.1.1","8.8.8.8","8.8.4.4"],"locked":false,"outboundTag":"proxy","remarks":"DNS - прокси"},{"domain":["ident.me"],"enabled":true,"locked":false,"outboundTag":"proxy","remarks":"Избранные сайты - прокси"},{"domain":["yandex.net"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Избранные сайты - напрямую"},{"domain":["geosite:category-ru"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Российские домены - напрямую"},{"domain":["domain:ru","domain:xn--p1ai"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Домены .RU, .РФ - напрямую"},{"enabled":true,"ip":["geoip:ru"],"locked":false,"outboundTag":"direct","remarks":"Российские IP - напрямую"},{"enabled":true,"locked":false,"outboundTag":"proxy","port":"0-65535","remarks":"Все остальное - прокси"}]
```

2. Меню ≡ - **Маршрутизация** - ︙(в правом верхнем углу) - **Импорт правил из буфера обмена**. Согласитесь на удаление существующих правил.

#### Проверка маршрутов

Перезапустите подключение и убедитесь, что маршруты работают правильно:
- [https://www.ident.me/](https://www.ident.me/) - адрес IPv4 на веб-странице зарубежный
- [https://rutracker.org/](https://rutracker.org/) - открывается ресурс, который заблокировал РКН
- [https://www.strava.com/](https://www.strava.com) - открывается ресурс, который сам заблокировал доступ из РФ

## Windows

### Загрузка и установка
[v2rayN](https://github.com/2dust/v2rayN/)

1. Скачайте архив [https://github.com/2dust/v2rayN/releases/latest/download/v2rayN-windows-64-desktop.zip](https://github.com/2dust/v2rayN/releases/latest/download/v2rayN-windows-64-desktop.zip)
2. Распакуйте архив и запустите **v2rayN.exe**.
3. Если надо сменить язык, нажмите ︙(в правом верхнем углу) - выберите язык - нажмите **Выход** в верхнем меню.

### Импорт конфигурации в приложение

#### Импорт серверов с помощью ссылки
Самый распространенный способ. 
1. Скопируйте присланную ссылку вида VLESS:// в буфер обмена.
2. Щелкните мышью в верхней части окна и нажмите **Ctrl+V**. Либо щелкните **Серверы** - **Импорт массива URL из буфера обмена**.

#### Импорт серверов с помощью подписки
1. Скопируйте присланную вам веб-ссылку в буфер обмена.
2. В верхнем меню **Группа подписки** - **Настройка группы подписки**
3. Нажмите **Добавить" и заполните поля
  - **Примечание**: любое понятное вам
  - **URL (необязательно)**: вставьте ссылку из буфера обмена - для вас это обязательно!
4. Нажмите **Подтвердить** и вернитесь на главный экран.

<img src="v2rayn-subs.png" alt="screenshot">

#### Обновление подписки
Чтобы получить список серверов из подписки, нажмите в верхнем меню **Группа подписки** и выберите любой вариант обновления. Список серверов пополнится новыми.

<img src="v2rayn-subs-update.png" alt="screenshot">

**Примечание**. Старые серверы может понадобиться удалить вручную.

### Активация подключения к серверу (режим прокси)
1. Выделите подключение в списке и нажмите Enter либо щелкните **Перезагрузка** в верхнем меню.
2. Внизу приложения выберите из списка **Установить системный прокси**.
3. Проверьте работу прокси, перейдя в браузере по ссылке [https://www.ident.me/](https://www.ident.me/). Адрес IPv4 на веб-странице должен совпадать с адресом сервера в v2rayN.

<img src="v2rayn-proxy.png" alt="screenshot">

### Управление состоянием приложения и подключений
- Приложение отображает значок в трее рядом с часами. Возможно, понадобится вытащить значок в видимую область.
- Красный значок - обход блокировок активен. Синий - неактивен.
- Правой кнопкой мыши на значке можно вызвать меню быстрого управления приложением.

### Настройка маршрутизации

### Добавление маршрутов
1. Скопируйте эти правила в буфер обмена:
```
[{"enabled":true,"locked":false,"outboundTag":"direct","protocol":["bittorent"],"remarks":"Торрент - напрямую"},{"enabled":true,"ip":["geoip:private"],"locked":false,"outboundTag":"direct","remarks":"Частные сети - напрямую"},{"domain":["geosite:private"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Частные домены - напрямую"},{"enabled":false,"ip":["1.0.0.1","1.1.1.1","8.8.8.8","8.8.4.4"],"locked":false,"outboundTag":"proxy","remarks":"DNS - прокси"},{"domain":["ident.me"],"enabled":true,"locked":false,"outboundTag":"proxy","remarks":"Избранные сайты - прокси"},{"domain":["yandex.net"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Избранные сайты - напрямую"},{"domain":["geosite:category-ru"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Российские домены - напрямую"},{"domain":["domain:ru","domain:xn--p1ai"],"enabled":true,"locked":false,"outboundTag":"direct","remarks":"Домены .RU, .РФ - напрямую"},{"enabled":true,"ip":["geoip:ru"],"locked":false,"outboundTag":"direct","remarks":"Российские IP - напрямую"},{"enabled":true,"locked":false,"outboundTag":"proxy","port":"0-65535","remarks":"Все остальное - прокси"}]
```
2. В верхнем меню **Настройки** - **Настройки маршрутизации** - **Добавить** - **Импорт правил из буфера обмена**. Там же в поле **Примечания** задайте имя: **Мои правила**.
3. Дважды нажмите **Подтвердить**.
4. В нижнем меню выберите из списка **Мои правила**.

<img src="v2rayn-routing-basic.png" alt="screenshot">

#### Проверка маршрутов

Перезапустите подключение и убедитесь, что маршруты работают правильно:
- [https://www.ident.me/](https://www.ident.me/) - адрес IPv4 на веб-странице зарубежный
- [https://rutracker.org/](https://rutracker.org/) - открывается ресурс, который заблокировал РКН
- [https://www.strava.com/](https://www.strava.com) - открывается ресурс, который сам заблокировал доступ из РФ


## iOS
### Приложения
- [OneXray](https://apps.apple.com/ru/app/onexray/id6745748773)
- [V2Box](https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690)

### Импорт конфигурации в приложение с помощью ссылки
1. Скопируйте присланную ссылку вида VLESS:// в буфер обмена.
2. В приложении нажмите ➕, затем **Импорт из буфера обмена** или похожий пункт.

## Диагностика проблем
Здесь возможные проблемы и пути их решения. 

### Сбор логов
Вас могут попросить предоставить логи, например, когда не удается подкюлчиться к серверу.

#### Android
1. Меню ≡ - **Настройки** - **Подробность ведения журнала**: warning.
2. Меню ≡ - **Журнал** - нажмите кнопку корзины 🗑️ в правом верхнем углу, чтобы очистить лог, даже если на экране ничего нет.
3. Вернитесь назад и  попробуйте подключиться к серверу.
4. Меню ≡ - **Журнал** - потяните страницу вниз для обновления, затем скопируйте журнал кнопкой в правом верхнем углу.

<img src="v2rayng-logs.png" alt="screenshot"> 

#### Windows
1. В нижней половине окна включите автообновление, затем нажмите значок корзины 🗑️, чтобы очистить лог.
2. В верхней половине окна выделите сервер, затем нажмите **Перезагрузка** в верхнем меню.
3. В нижней половине окна скопируйте лог кнопкой слева от корзины.

<img src="v2rayn-logs.png" alt="screenshot"> 

