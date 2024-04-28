import { Suspense } from "react";

import Chart from "./Chart";
import GraphLoading from "./GraphLoading";

interface GraphProps {
  searchParams: {
    city?: string;
  };
}

export default async function GraphWrapper(props: GraphProps) {
  return (
    <div className="bg-secondary">
      <div className="container pb-[60px] pt-[92px]">
        <div className="prose">
          <h2 className="mb-[50px] text-[24px] md:mb-0 md:text-[36px]">
            DAILY EVOLUTION
          </h2>
        </div>
        <Suspense fallback={<GraphLoading />}>
          {props.searchParams.city ? (
            <Chart location={props.searchParams?.city} />
          ) : (
            <GraphLoading />
          )}
        </Suspense>
      </div>
    </div>
  );
}
