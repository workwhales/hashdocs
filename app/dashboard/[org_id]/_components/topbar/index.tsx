import clsx from 'clsx';
import { PathSplit } from './pathSplit';

export default async function TopBar() {
  return (
    <div
      className={clsx(
        'hidden h-12 w-full flex-shrink-0 flex-row items-center justify-between gap-x-4 border-b border-gray-200 px-4 shadow-sm lg:flex'
      )}
    >
      <div className="flex flex-row items-center gap-x-3">
        <div className="group flex flex-row items-center gap-x-2 text-xs font-medium lowercase text-gray-500">
          <PathSplit />
        </div>
      </div>
    </div>
  );
}
