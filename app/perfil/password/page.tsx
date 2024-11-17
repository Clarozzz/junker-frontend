import DangerZone from "../components/danger-zone";
import PassChange from "../components/pass-change";

export default function Password() {
  return (
    <div className="space-y-8">
      <PassChange />
      <DangerZone />
    </div>
  )
}