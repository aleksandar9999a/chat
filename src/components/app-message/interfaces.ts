export interface IAppMessageProps {
  message: {
    text: string,
    [key: string]: any
  },
  isLeft?: boolean
}
