import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

type ModalProps = {
  open: boolean
  children: React.ReactNode
  title: string
  onClose?: () => void
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="text-white p-8 border border-emerald-700 bg-zinc-900 rounded-xl w-full max-w-2xl fixed-center text-xl tracking-wide data-[state=open]:animate-contentShow">
          <button className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200" onClick={onClose}>
            <Cross2Icon className="w-6 h-6" aria-label="Fechar" />
          </button>
          <Dialog.Title className="text-4xl leading-tight font-semibold text-orange-500 font-card-sides text-center after:content-[''] after:w-full after:h-1 after:block after:my-2 after:bg-gradient-to-r after:from-zinc-900 after:via-green-500 after:to-zinc-900 after:m-auto">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
