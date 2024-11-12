const fs = require("fs");
const path = require("path");

const readService = (id) => {
  const indexPath = path.join(__dirname, "services", "services_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const service = index.find((service) => service.id === id);

  if (!service) {
    console.error("Ошибка: Услуга не найдена.");
    return;
  }

  const servicePath = path.join(__dirname, "services", service.filename);
  const serviceData = fs.readFileSync(servicePath);

  console.log("Информация об услуге:");
  console.log(serviceData.toString());
};

const id = process.argv[2];

if (id) {
  readService(id);
} else {
  console.log("Использование: node read.js <id услуги>");
}
