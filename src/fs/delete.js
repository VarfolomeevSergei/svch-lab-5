const fs = require("fs");
const path = require("path");

const deleteService = (id) => {
  const indexPath = path.join(__dirname, "services", "services_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const service = index.find((service) => service.id === id);

  if (!service) {
    console.error("Ошибка: Запись не найдена.");
    return;
  }

  const servicePath = path.join(__dirname, "services", service.filename);

  if (fs.existsSync(servicePath)) {
    // Удаление файла
    fs.unlinkSync(servicePath);
    console.log(`Услуга с ID ${id} была удалена.`);

    const updatedIndex = index.filter((service) => service.id !== id);
    fs.writeFileSync(indexPath, JSON.stringify(updatedIndex, null, 2));
  } else {
    console.error("Ошибка: Файл не найден.");
  }
};

const id = process.argv[2];

if (id) {
  deleteService(id);
} else {
  console.log("Использование: node delete.js <id услуги>");
}
