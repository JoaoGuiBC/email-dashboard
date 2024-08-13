import { Checkbox } from './ui/checkbox'

export function ContactCard() {
  return (
    <div className="bg-zinc-900 flex p-4 justify-between rounded-md">
      <div>
        <strong className="leading-3">Contato de exemplo</strong>
        <p className="text-xs leading-none">contato@exemplo.com</p>
      </div>

      <Checkbox />
    </div>
  )
}
