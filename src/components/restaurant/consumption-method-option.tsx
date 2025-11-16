import Image from 'next/image';
import Link from 'next/link';

import { ConsumptionMethod } from '../../../prisma/generated/enums';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface ConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

export default function ConsumptionMethodOption({
  imageUrl,
  imageAlt,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOptionProps) {
  return (
    <Card className="h-64 w-48">
      <CardContent className="flex h-full flex-col items-center justify-between py-6">
        <div className="relative h-20 w-20">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>

        <Button variant="secondary" className="rounded-full">
          <Link href={`/${slug}/menu/?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
