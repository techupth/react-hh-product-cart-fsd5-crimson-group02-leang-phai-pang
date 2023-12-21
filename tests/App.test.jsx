import products from "../src/data/products";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { expect } from "vitest";
import fs from "fs";
import path from "path";

describe("React-State : App", () => {
  it("ยังไม่ได้แสดง products's names", () => {
    render(<App />);
    products.forEach((product) => {
      const regex = new RegExp(product.name);
      const productNameElement = screen.getByText(regex);
      expect(productNameElement).toBeInTheDocument();
    });
  });

  it("ยังไม่ได้แสดง products's descriptions", () => {
    render(<App />);
    products.forEach((product) => {
      const regex = new RegExp(product.description);
      const productDescriptionElement = screen.getByText(regex);
      expect(productDescriptionElement).toBeInTheDocument();
    });
  });

  it("ยังไม่ได้แสดง products's images", () => {
    render(<App />);
    const imageElements = screen.getAllByRole("img");
    imageElements.forEach((imageElement) => {
      expect(imageElement).toHaveAttribute("src");
      expect(imageElement.getAttribute("src")).toBeTruthy();
    });
  });

  it("ยังไม่ใส่ function onClick ที่ปุ่ม 'Add to cart'", async () => {
    render(<App />);
    const buttonElements = screen.getAllByRole("button", {
      name: "Add to cart",
    });
    buttonElements.forEach((buttonElement) => {
      fireEvent.click(buttonElement);
    });

    products.forEach((product) => {
      const regex = new RegExp(product.name);
      const productNameElement = screen.getAllByText(regex);
      expect(productNameElement.length).toBeGreaterThan(1);
    });
  });

  it("ยังไม่ใส่ condition สำหรับเพิ่มสินค้าที่ซ้ำกัน กับสินค้าในตะกร้า", async () => {
    render(<App />);
    const buttonElements = screen.getAllByRole("button", {
      name: "Add to cart",
    });
    buttonElements.forEach((buttonElement) => {
      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);
    });

    const regex = new RegExp("Quantity: 2");
    const quantityInCart = screen.getAllByText(regex);
    expect(quantityInCart.length).toBe(10);
  });

  it("ยังไม่ใส่ function onClick ที่ปุ่ม 'x'", async () => {
    render(<App />);
    const buttonElements = screen.getAllByRole("button", {
      name: "Add to cart",
    });
    buttonElements.forEach((buttonElement) => {
      fireEvent.click(buttonElement);
    });

    const deleteButtonElements = screen.getAllByRole("button", {
      name: "x",
    });
    deleteButtonElements.forEach((deleteButtonElement) => {
      fireEvent.click(deleteButtonElement);
    });

    products.forEach((product) => {
      const regex = new RegExp(product.name);
      const productNameElement = screen.getAllByText(regex);
      expect(productNameElement.length).toBe(1);
    });
  });

  it("ยังไม่ใส่ function onClick ที่ปุ่ม '+'", async () => {
    render(<App />);
    const buttonElements = screen.getAllByRole("button", {
      name: "Add to cart",
    });
    buttonElements.forEach((buttonElement) => {
      fireEvent.click(buttonElement);
    });

    const addButtonElements = screen.getAllByRole("button", {
      name: "+",
    });
    addButtonElements.forEach((addButtonElement) => {
      fireEvent.click(addButtonElement);
    });

    const regex = new RegExp("Quantity: 2");
    const quantityInCart = screen.getAllByText(regex);
    expect(quantityInCart.length).toBe(10);
  });

  it("ยังไม่ใส่ function onClick ที่ปุ่ม '-'", async () => {
    render(<App />);
    const buttonElements = screen.getAllByRole("button", {
      name: "Add to cart",
    });
    buttonElements.forEach((buttonElement) => {
      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);
    });

    const subtractButtonElements = screen.getAllByRole("button", {
      name: "-",
    });
    subtractButtonElements.forEach((subtractButtonElement) => {
      fireEvent.click(subtractButtonElement);
    });

    const regex = new RegExp("Quantity: 1");
    const quantityInCart = screen.getAllByText(regex);
    expect(quantityInCart.length).toBe(10);
  });

  it("ยังไม่ใส่ condition สำหรับลบสินค้าที่มีจำนวนแค่ 1 ชิ้น ออกจากตะกร้า", async () => {
    render(<App />);
    const buttonElements = screen.getAllByRole("button", {
      name: "Add to cart",
    });
    buttonElements.forEach((buttonElement) => {
      fireEvent.click(buttonElement);
    });

    const subtractButtonElements = screen.getAllByRole("button", {
      name: "-",
    });
    subtractButtonElements.forEach((subtractButtonElement) => {
      fireEvent.click(subtractButtonElement);
    });

    products.forEach((product) => {
      const regex = new RegExp(product.name);
      const productNameElement = screen.getAllByText(regex);
      expect(productNameElement.length).toBe(1);
    });
  });

  it("ยังไม่ได้แสดง การคำนวณ total price ในตะกร้าสินค้า", async () => {
    render(<App />);
    const buttonElements = screen.getAllByRole("button", {
      name: "Add to cart",
    });
    buttonElements.forEach((buttonElement) => {
      fireEvent.click(buttonElement);
    });

    const regex = new RegExp(49528);
    const productNameElement = screen.getByText(regex);
    expect(productNameElement).toBeInTheDocument();
  });

  it("ไม่ได้ใช้การสร้าง State เป็น Array ในการทำโจทย์", async () => {
    const exercisePath = path.join(process.cwd(), "src/App.jsx");
    const data = await fs.readFileSync(exercisePath, "utf8");
    const regex = /useState\(\[\]\)/g;
    const found = data.match(regex);

    expect(found.length).toBeGreaterThan(0);
  });
});
