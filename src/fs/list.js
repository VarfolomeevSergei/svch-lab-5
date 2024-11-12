const fs = require("fs");
const path = require("path");

const listServices = () => {
  const indexPath = path.join(__dirname, "services", "services_index.json");

  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath));
    console.log("Список всех услуг:");
    index.forEach((service) => {
      console.log(`${service.id}: ${service.name} (${service.type}) - Цена: ${service.price}`);
    });
  } else {
    console.log("Записей нет.");
  }
};

listServices();

