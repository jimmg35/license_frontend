interface ManagerInterface {
  readonly using: boolean
  use: (arg: any) => any
  clear: () => void
}

export default ManagerInterface
