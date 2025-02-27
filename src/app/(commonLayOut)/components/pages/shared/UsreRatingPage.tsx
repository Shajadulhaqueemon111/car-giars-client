import React from "react";
import { Card, CardFooter, Image, Button } from "@heroui/react";
const UsreRatingPage = () => {
  return (
    <div>
      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={400}
          src="https://i.ibb.co.com/fLLrwMN/young-bearded-man-with-striped-shirt-273609-5677-1.jpg"
          width={600}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">
            The 2024 Corolla features a more aerodynamic and sporty design with
            a bold front grille, LED headlights, and a refined interior.
          </p>
          <p className="text-tiny text-white/80">
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </p>
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="flat"
          >
            Notify me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsreRatingPage;
