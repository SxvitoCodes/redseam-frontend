import './App.css'
import Button from "./components/Button"
import Input from "./components/Input"
import PaginationButton from "./components/PaginationButton"

function App() {
  return (
    <div className="p-10 space-y-6 bg-grey min-h-screen">
      <h1 className="text-3xl text-primary">RedSeam Clothing</h1>
      
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>

      <div className="flex flex-col gap-4 max-w-sm">
        <Input placeholder="Default input" />
        <Input variant="dark" placeholder="Dark input" />
        <Input variant="error" placeholder="Error input" errorMessage="Required field" />
      </div>

      <div className="flex gap-2">
        <PaginationButton label={1} />
        <PaginationButton label={2} active />
        <PaginationButton label={3} />
      </div>
    </div>
  )
}

export default App

