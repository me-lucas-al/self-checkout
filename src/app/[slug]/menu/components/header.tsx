'use client';

import { useEffect, useState } from 'react';

import NextImage  from 'next/image';
import { useRouter } from 'next/navigation';
import  ColorThief  from "colorthief";
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Restaurant } from '@prisma/generated/client';

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, 'name' | 'coverImageUrl' | 'avatarImageUrl'>;
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  const router = useRouter();
   const [bgColor, setBgColor] = useState<string>("");

  const colorThief = new ColorThief();

  async function getAvgColor(restaurant: Pick<Restaurant, 'avatarImageUrl'>) {
    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = restaurant.avatarImageUrl;

      img.onload = () => {
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(img);
        setBgColor(`rgba(${r}, ${g}, ${b}, 1)`);
      };

    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAvgColor(restaurant);
  }, [restaurant]);

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-50 rounded-full hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="relative mx-auto mb-2 h-[250px] w-full overflow-hidden md:h-[300px] lg:h-[250px]">
        <div className="lg:hidden">
          <NextImage 
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden lg:flex lg:h-full lg:items-center lg:justify-center">
          <NextImage
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={120}
            height={120}
          />
        </div>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 z-50 rounded-full hover:cursor-pointer">
          <ScrollTextIcon />
      </Button>
    </div>
  );
}
