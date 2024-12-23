import React, { useState } from 'react'

export default function ChargingStationForm({ chargingStation, updateChargingStation }) {

  const { locationType, zipCode, city, chargingStandard, voltageSupported, energyDelivered, minPowerRange, maxPowerRange, connectorType, paymentModel, longitude, latitude } = chargingStation;

  const handleChangeChargingStation = (e) => {
    const { name, value } = e.target;
    updateChargingStation({
      ...chargingStation,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="locationType">
          Location Type
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Location Type"
          name='locationType'
          onChange={handleChangeChargingStation}
          value={locationType} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="zipCode">
          Zip Code
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Zip Code (ex: 4654-323)"
          name='zipCode'
          onChange={handleChangeChargingStation}
          value={zipCode} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
          City
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="City"
          name='city'
          onChange={handleChangeChargingStation}
          value={city} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="chargingStandard">
          Charging Standard
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Charging Standard"
          name='chargingStandard'
          onChange={handleChangeChargingStation}
          value={chargingStandard} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="voltageSupported">
          Voltage Supported V
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Voltage "
          name='voltageSupported'
          onChange={handleChangeChargingStation}
          value={voltageSupported} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="energyDelivered">
          Energy Delivered kwh
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Energy Delivered"
          name='energyDelivered'
          onChange={handleChangeChargingStation}
          value={energyDelivered} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="minPowerRange">
          Min Power Range (W)
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Min Power Range"
          name='minPowerRange'
          onChange={handleChangeChargingStation}
          value={minPowerRange} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="maxPowerRange">
          Max Power Range (W)
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder=" Max Power Range"
          name='maxPowerRange'
          onChange={handleChangeChargingStation}
          value={maxPowerRange} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="connectorType">
          Connector Type
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Connector Type"
          name='connectorType'
          onChange={handleChangeChargingStation}
          value={connectorType} />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="paymentModel">
          Payment Model
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Payment Model"
          name='paymentModel'
          onChange={handleChangeChargingStation}
          value={paymentModel} />
      </div>

      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="longitude">
          Longitude
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Longitude"
          name='longitude'
          onChange={handleChangeChargingStation}
          value={longitude} />
      </div>

      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="latitude">
          Latitude
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Latitude"
          name='latitude'
          onChange={handleChangeChargingStation}
          value={latitude} />
      </div>
    </div>
  )
}