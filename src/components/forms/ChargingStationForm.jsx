import React, { useState } from 'react'

export default function ChargingStationForm({ chargingStation, updateChargingStation }) {

  // const [energyDelivered, setenergyDelivered] = useState(85);

  // const updateEnergyDelivered = (e) => {
  //   const newenergyDelivered = e.target.value;
  //   setenergyDelivered(newenergyDelivered); // Update local energyDelivered state
  //   updateChargingStation({
  //     ...chargingStation,
  //     energyDelivered: newenergyDelivered // Update chargingStation with the new value
  //   });
  // };

  const { locationType, zipCode, city, chargingStandard, voltageSupported, connectorType, paymentModel } = chargingStation;

  const handleChangeStation = (e) => {
    const { name, value } = e.target;
    setChargingStation((prevState) => ({
      ...prevState,
      [name]: value // This ensures that the specific field is updated
    }));
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
          name='locationType' />
      </div>
      <div>
        <div className="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="zipCode">
            Zip Code
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Zip Code (ex: 4654-323)"
            name='zipCode'
          />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
            City
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="City"
            name='city'
          />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="chargingStandard">
            Charging Standard
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Charging Standard"
            name='chargingStandard'
          />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="voltageSupported">
            Voltage Supported
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Voltage "
            name='voltageSupported'
          />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="connectorType">
            Connector Type
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Connector Type"
            name='connectorType'
          />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="paymentModel">
            Payment Model
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Payment Model"
            name='paymentModel'
          />
        </div>
      </div>
    </div>



    // <div>

    //   <div class="mb-4">
    //     <label class="block text-gray-700 text-sm font-bold mb-2" for="locationType">
    //       Location Type
    //     </label>
    //     <select
    //       class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
    //       name="locationType"
    //       value={locationType}
    //       onChange={handleChangeStation}>
    //       <option value="supermarket">Supermarket</option>
    //       <option value="shoppingMall">Shopping Mall</option>
    //       <option value="restaurant">Restaurant</option>
    //       <option value="highway">Highway Stop</option>
    //       <option value="hotel">Hotel</option>
    //       <option value="airport">Airport</option>
    //       <option value="university">University</option>
    //       <option value="gasStation">Gas Station</option>
    //       <option value="parking">Parking Lot</option>
    //     </select>
    //   </div>

    //   <div className="mb-4">
    //     <label class="block text-gray-700 text-sm font-bold mb-2" for="zipCode">
    //       Zip Code
    //     </label>
    //     <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       type="text"
    //       placeholder="Zip Code"
    //       name='zipCode'
    //       onChange={handleChangeStation}
    //       value={zipCode} />
    //   </div>

    //   <div className="mb-4">
    //     <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
    //       City
    //     </label>
    //     <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       type="text"
    //       placeholder="City"
    //       name='city'
    //       onChange={handleChangeStation}
    //       value={city} />
    //   </div>

    //   <div class="mb-4">
    //     <label class="block text-gray-700 text-sm font-bold mb-2" for="chargingStandard">
    //       Charging Standard
    //     </label>
    //     <select
    //       class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
    //       name="chargingStandard"
    //       value={chargingStandard}
    //       onChange={handleChangeStation}>
    //       <option value="fastCharging">Fast Charging</option>
    //       <option value="slowCharging">Slow Charging</option>
    //     </select>
    //   </div>

    //   <div className="mb-4">
    //     <label class="block text-gray-700 text-sm font-bold mb-2" for="voltageSupported">
    //       Voltage Supported
    //     </label>
    //     <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       type="text"
    //       placeholder="Voltage"
    //       name='voltageSupported'
    //       value={voltageSupported}
    //       onChange={handleChangeStation} />
    //   </div>

    //   <div class="mb-4">
    //     <label class="block text-gray-700 text-sm font-bold mb-2" for="energyDelivered">
    //       Energy delivered
    //     </label>
    //     <input
    //       type="range"
    //       id="energyDelivered-range"
    //       class="w-full accent-indigo-600 capacity-container"
    //       min="20"
    //       max="350"
    //       value={energyDelivered}
    //       onChange={updateEnergyDelivered} />
    //     <div class="flex justify-between text-gray-500">
    //       <span id="minBatCapacity">{energyDelivered}kwh</span>
    //       <span id="maxBatCapacity">350kwh</span>
    //     </div>
    //   </div>

    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="connectorType">
    //       Connector Types
    //     </label>
    //     <select
    //       className="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
    //       name="connectorType"
    //       value={chargingStation.connectorType} // Binding the selected value
    //       onChange={handleChangeStation}
    //     >
    //       {ConnectorTypeOptions.map((type) => (
    //         <option key={type} value={type}>
    //           {type} {/* Displaying the enum-like value */}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <div class="mb-4">
    //     <label class="block text-gray-700 text-sm font-bold mb-2" for="paymentModel">
    //       Payment Model
    //     </label>
    //     <select
    //       class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
    //       name="paymentModel"
    //       value={paymentModel}
    //       onChange={handleChangeStation}>
    //       <option value="subscriptionBased">Subscription Based</option>
    //       <option value="free">Free</option>
    //       <option value="payPerUse">Pay-per-use</option>
    //     </select>
    //   </div>
    // </div>
  )
}
