import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-b-gray-200 bg-white h-16">
      <div className="h-full flex gap-8 items-center px-8">
        <p className="font-bold text-2xl">Prime Boss</p>
        <ul className="flex gap-4">
          <li className="font-bold">
            <Link href="/servers">Servers</Link>
          </li>
          <li className="font-bold">
            <Link href="/boss">Boss</Link>
          </li>
          {/* <li className="font-bold">
            <Link href="/users">Usuários</Link>
          </li> */}
          <li className="font-bold">
            <Link href="/tracker">Boss Tracker</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
