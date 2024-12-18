/* eslint-disable react/prop-types */
import { Activity, TrendingUp } from "lucide-react";
import DetailItem from "./DetailItem";

export default function AdditionalDetails({ instrument }) {
  return (
    <div>
      {instrument.metadata && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <Activity className="mr-2 text-green-600" /> Zusätzliche Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <DetailItem
              label="Sektor"
              value={instrument.metadata.sector || "Nicht verfügbar"}
              icon={<TrendingUp className="text-green-500 w-5 h-5" />}
              className="bg-green-50/50"
            />
            <DetailItem
              label="Leistung"
              value={instrument.metadata.performance || "Nicht verfügbar"}
              className="bg-blue-50/50"
            />
            <div className="md:col-span-2">
              <DetailItem
                label="Beschreibung"
                value={
                  instrument.metadata.description ||
                  "Keine Beschreibung verfügbar"
                }
                className="bg-gray-50/50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
