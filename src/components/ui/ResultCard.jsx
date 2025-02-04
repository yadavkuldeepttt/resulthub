
// components/ui/ResultCard.jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export const ResultCard = ({ title, value, date }) => (
  <Card className="w-full transition-all hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Bell size={16} className="text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500">{date}</p>
    </CardContent>
  </Card>
);
