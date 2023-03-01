const mockData = [
  {
    id: 1,
    name: "Kawasaki z1000",
  },
  {
    id: 2,
    name: "Yamaha MT10",
  },
  {
    id: 1,
    name: "Honda CBR S100RR",
  },
];

export function getMotobikes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockData,
        status: 200,
      });
    }, 1500);
  });
}
