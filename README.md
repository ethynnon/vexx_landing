# VEXX Host Landing Page

Скромный, легкий и адаптивный лендинг для сайта аренды защищенных VPS серверов в Европе.

---

## ⚡ Быстрый деплой (Docker Compose)

Сборка фронтенда происходит полностью внутри Docker-контейнера (multi-stage build), поэтому устанавливать Node.js, npm или другие зависимости на сервере не требуется.

### 1. Установка Docker (если еще не установлен)
```bash
sudo curl -fsSL https://get.docker.com | sh
```

### 2. Подготовка директории проекта
Создайте рабочую папку на сервере и перейдите в нее:
```bash
mkdir -p /opt/vexx_landing && cd /opt/vexx_landing
```

### 3. Копирование файлов
Скопируйте в эту папку файлы проекта:
*   `docker-compose.yml`
*   `Dockerfile`
*   `nginx.conf`
*   папки `src`, `public` и остальные файлы кода.

### 4. Запуск контейнера
Запустите сборку и старт лендинга в фоновом режиме:
```bash
docker compose up -d && docker compose logs -f -t
```
Сайт соберется и запустится внутри контейнера на локальном порту **`8085`**.

---

## 🛡️ Настройка веб-сервера Caddy

Поскольку лендинг работает на порту `8085`, он идеально интегрируется с вашей существующей панелью Remnawave и ботом без конфликтов портов.

Добавьте в ваш системный `/etc/caddy/Caddyfile` следующий блок для домена лендинга:

```caddy
your-promo-domain.com, www.your-promo-domain.com {
    # Сжатие трафика
    encode gzip zstd

    # Проксируем все запросы в контейнер лендинга
    reverse_proxy localhost:8085

    # Заголовки безопасности
    header {
        -Server
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
```

После добавления конфигурации перезагрузите Caddy на сервере:
```bash
systemctl reload caddy
```

---

## 📁 Структура проекта для редактирования

*   [`src/content.ts`](file:///c:/Users/kuz11/Antigravity/vexx_landing/src/content.ts) — **Основной файл контента**. Все тексты сайта, тарифы, лимиты, FAQ и email поддержки редактируются только здесь.
*   [`public/`](file:///c:/Users/kuz11/Antigravity/vexx_landing/public) — Папка с графикой: мокапы личного кабинета и превью-картинки для ссылок (`preview_16_9.png`).
