export default function PaymentHistoryUserPage() {
    const invoices = [
        {
            id: 1,
            description: "Room payment for October",
            date: "2024-10-05",
            amount: 2000000,
        },
        {
            id: 2,
            description: "Electricity payment for October",
            date: "2024-10-10",
            amount: 500000,
        },
        {
            id: 3,
            description: "Water payment for October",
            date: "2024-10-15",
            amount: 200000,
        },
        {
            id: 4,
            description: "Internet service payment for October",
            date: "2024-10-20",
            amount: 300000,
        },
    ];

    const totalAmount = invoices.reduce(
        (total, invoice) => total + invoice.amount,
        0
    );

    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col">
            <div
                aria-label="breadcrumb"
                className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
            >
                <ol className="flex space-x-2">
                    <li>
                        <a href="/finance" className="hover:underline">
                            Finance
                        </a>
                    </li>
                    <li>
                        <span className="text-[#2b6534]">›</span>
                    </li>
                    <li className="font-semibold">Payment history</li>
                </ol>
            </div>
            <div className="p-6 m-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Payment History</h2>
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-3 text-lg">
                                Invoice Description
                            </th>
                            <th className="border-b p-3 text-lg">
                                Payment Date
                            </th>
                            <th className="border-b p-3 text-lg">
                                Amount (VND)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="border-b p-3 text-lg">
                                    {invoice.description}
                                </td>
                                <td className="border-b p-3 text-lg">
                                    {invoice.date}
                                </td>
                                <td className="border-b p-3 text-lg">
                                    {invoice.amount.toLocaleString("vi-VN")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                colSpan="2"
                                className="p-3 font-semibold text-right border-t"
                            >
                                Total Amount Paid:
                            </td>
                            <td className="p-3 font-semibold border-t">
                                {totalAmount.toLocaleString("vi-VN")} VND
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
