# Используем официальный образ Python
FROM python:3.12-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей и устанавливаем их
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект в контейнер
COPY . /app/

# Задаем переменные окружения для Django
ENV PYTHONUNBUFFERED 1

# Команда для запуска Django-сервера
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

