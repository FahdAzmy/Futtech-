FROM node:18

WORKDIR /app

# نسخ package.json و package-lock.json فقط لتقليل إعادة البناء عند تغييرات الكود
COPY package*.json ./
RUN npm install

# نسخ باقي الملفات
COPY . .

EXPOSE 4000 

CMD ["npm", "start"] 
