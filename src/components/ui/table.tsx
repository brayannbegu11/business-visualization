export function Table({ children }: React.HTMLAttributes<HTMLTableElement>) {
  return <table className="min-w-full bg-white border">{children}</table>;
}

export function TableHeader({ children }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableRow({ children }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">{children}</th>;
}

export function TableBody({ children }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody>{children}</tbody>;
}

export function TableCell({ children }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-6 py-3 text-sm text-gray-600">{children}</td>;
}