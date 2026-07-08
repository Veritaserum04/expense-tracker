import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Get your existing user
  const user = await prisma.user.findFirst();

  if (!user) {
    console.log("No user found. Please register first.");
    return;
  }

  // Delete old expenses (optional)
  await prisma.expense.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // Sample expenses
  const expenses = [
    {
      title: "Lunch",
      amount: 250,
      category: "Food",
      date: new Date("2026-07-01"),
    },
    {
      title: "Uber",
      amount: 450,
      category: "Travel",
      date: new Date("2026-07-02"),
    },
    {
      title: "Netflix",
      amount: 649,
      category: "Entertainment",
      date: new Date("2026-07-03"),
    },
    {
      title: "Groceries",
      amount: 1800,
      category: "Food",
      date: new Date("2026-07-04"),
    },
    {
      title: "Coffee",
      amount: 180,
      category: "Food",
      date: new Date("2026-07-05"),
    },
    {
      title: "Movie",
      amount: 350,
      category: "Entertainment",
      date: new Date("2026-07-06"),
    },
    {
      title: "Petrol",
      amount: 2200,
      category: "Transport",
      date: new Date("2026-07-07"),
    },
    {
      title: "Amazon Order",
      amount: 1450,
      category: "Shopping",
      date: new Date("2026-07-08"),
    },
    {
      title: "Electricity Bill",
      amount: 1850,
      category: "Bills",
      date: new Date("2026-07-09"),
    },
    {
      title: "Mobile Recharge",
      amount: 299,
      category: "Bills",
      date: new Date("2026-07-10"),
    },
  ];

  for (const expense of expenses) {
    await prisma.expense.create({
      data: {
        ...expense,
        userId: user.id,
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });