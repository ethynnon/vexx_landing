# VEXX Host Landing Page

Скромный, легкий и адаптивный лендинг для сайта аренды защищенных VPS серверов в Европе.

---

## ⚡ Быстрый деплой (Docker Compose)

Сборка фронтенда происходит полностью внутри Docker-контейнера (multi-stage build), поэтому устанавливать Node.js, npm или другие зависимости на сервере не требуется.

### 1. Установка Docker (если еще не установлен)
```bash
sudo curl -fsSL https://get.docker.com | sh
```

### 2. Деплой проекта одной командой (Git + Docker Compose)
Вся сборка фронтенда происходит автоматически внутри Docker-контейнера. Вам достаточно просто клонировать репозиторий с кодом на сервер и запустить его:

```bash
# Создаем рабочую папку на сервере
mkdir -p /opt/vexx_landing

# Клонируем репозиторий в созданную папку
git clone https://github.com/ethynnon/vexx_landing.git /opt/vexx_landing

# Переходим в папку проекта
cd /opt/vexx_landing

# Запускаем сборку и старт лендинга в фоновом режиме
docker compose up -d && docker compose logs -f -t
```
*   **Почему нужны исходники на сервере?** Dockerfile выполняет двухэтапную сборку: он берет файлы кода из папки (`src/`, `public/`), компилирует их в статический HTML/JS/CSS внутри временного Node-окружения, а затем передает готовый результат легкому Nginx (который служит раздатчиком статики внутри контейнера).
*   Лендинг будет собран и запущен на локальном порту **`8085`**.

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
