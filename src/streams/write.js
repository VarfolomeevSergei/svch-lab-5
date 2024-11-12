const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "services.json");

const writeDataToFile = (newServiceData) => {
  // Читаем текущее содержимое файла
  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return;
    }

    let services = [];

    // Если файл не пустой, парсим его содержимое
    if (data) {
      try {
        services = JSON.parse(data);
      } catch (parseError) {
        console.error("Ошибка при парсинге JSON:", parseError);
        return;
      }
    }

    // Добавляем новые данные
    services.push(...newServiceData);

    // Записываем обновленный массив обратно в файл
    fs.writeFile(filePath, JSON.stringify(services, null, 2), (writeError) => {
      if (writeError) {
        console.error("Ошибка при записи файла:", writeError);
      } else {
        console.log("Запись завершена.");
      }
    });
  });
};

const newServices = [
  {
    id: Date.now(),
    name: "Consultation",
    type: "Consultation",
    price: 100,
  },
  {
    id: Date.now() + 1,
    name: "X-Ray",
    type: "Diagnostic",
    price: 150,
  },
];

// Вызываем функцию для записи данных
writeDataToFile(newServices);

