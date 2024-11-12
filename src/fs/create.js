// Импорт компонентов для работы с Node.js
const fs = require("fs");
const path = require("path");

const serviceDir = path.join(__dirname, "services");
const indexFile = path.join(serviceDir, "services_index.json");

fs.mkdirSync(serviceDir, { recursive: true });

const createService = (name, type, price) => {
  const id = Date.now().toString();
  const filename = `service_${id}.json`;
  const serviceData = { id, name, type, price };

  const servicePath = path.join(serviceDir, filename);

  if (fs.existsSync(servicePath)) {
    console.error("Ошибка операции FS: Запись уже существует");
    return;
  }

  fs.writeFileSync(servicePath, JSON.stringify(serviceData, null, 2));

  const index = fs.existsSync(indexFile)
    ? JSON.parse(fs.readFileSync(indexFile))
    : [];
  index.push({ id, name, type, price, filename });
  
  // null - не нужно использовать функцию замены
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

  console.log(`Услуга "${name}" была успешно добавлена.`);
};

// Получаем аргументы командной строки
const [name, type, price] = process.argv.slice(2);

if (name && type && price) {
  createService(name, type, price);
} else {
  console.log("Использование: node create.js <название> <тип> <цена>");
}

