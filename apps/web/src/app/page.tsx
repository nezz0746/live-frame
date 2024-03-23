import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

export default function Page(): JSX.Element {
  return (
    <main>
      <Card className="bg-gray-200">
        <CardHeader>
          <CardTitle>Hello</CardTitle>
          <CardDescription>This is a card</CardDescription>
        </CardHeader>
        <CardContent>ETHGlobal Hackathon</CardContent>
        <CardFooter>
          <Button>This is the way</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
