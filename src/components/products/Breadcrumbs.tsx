import Link from "next/link";
import ArrowRightIcon from "../ui/ArrowRightIcon";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-1 md:gap-2 lg:gap-4 mb-4 lg:mb-6">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1 md:gap-2 lg:gap-4">
          {index > 0 && <ArrowRightIcon />}
          {item.href ? (
            <Link
              href={item.href}
              className="font-medium leading-normal text-[10px] sm:text-[12px] transition-all duration-300 ease-in-out hover:text-orange-100"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-grey-100 font-medium leading-normal text-[10px] sm:text-[12px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
