import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

interface TabViewProps<T extends string = string> {
  activeTab: T
  setActiveTab: (tab: T) => void
  tabs: T[]
  className?: string // Optional: for custom styles
  ariaLabel?: string // Optional: for accessibility
}

export default function TabView<T extends string>({
  activeTab,
  setActiveTab,
  tabs,
  className = "",
  ariaLabel = "Tab navigation",
}: TabViewProps<T>) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as T)} aria-label={ariaLabel} className={className}>
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="capitalize">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
