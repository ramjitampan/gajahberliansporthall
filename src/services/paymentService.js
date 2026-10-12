const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const paymentService = {
  async checkStatus() {
    await wait(450);
    return { status: "pending" };
  },
  async simulate(status = "success") {
    await wait(850);
    if (status === "success") return { status: "paid", paidAt: new Date().toISOString() };
    if (status === "expired") return { status: "expired" };
    return { status: "failed" };
  },
};
