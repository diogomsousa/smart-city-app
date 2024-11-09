import React, { useState } from 'react'

export default function ChargingStationForm() {

  const [powerCapacity, setPowerCapacity] = useState(85);

  const updatePowerCapacity = (e) => {
    setPowerCapacity(e.target.value);
  }

  const [voltageCapacity, setVoltageCapacity] = useState(250);

  const updateVoltageCapacity = (e) => {
    setPowerCapacity(e.target.value);
  }
  return (
    <div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
          Charging Behavior
        </label>
        <select
          class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
          name="chargingBehavior">
          <option value="shortUse">Frequent short trips</option>
          <option value="longUse">Long-distance travel</option>
          <option value="ocassionalUse">Ocassional use</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
          Zip Code
        </label>
        <input
          class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
          placeholder="ZIP code (45624)"
          pattern="^\d{5}$"
          maxlength="5"
        />
      </div>
      <div className="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
          City
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="City"
          name='city' />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
          Charging Standard
        </label>
        <select
          class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
          name="chargingBehavior">
          <option value="fastCharging">Fast Charging</option>
          <option value="fastCharging">Slow Charging</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
          Voltage Supported
        </label>
        <input
          type="range"
          id="voltageCapacity-range"
          class="w-full accent-indigo-600 capacity-container"
          min="100"
          max="400"
          value={voltageCapacity}
          onChange={updateVoltageCapacity} />
        <div class="flex justify-between text-gray-500">
          <span id="minBatCapacity">{voltageCapacity}V</span>
          <span id="maxBatCapacity">400V</span>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
          Energy delivered
        </label>
        <input
          type="range"
          id="powerCapacity-range"
          class="w-full accent-indigo-600 capacity-container"
          min="20"
          max="350"
          value={powerCapacity}
          onChange={updatePowerCapacity} />
        <div class="flex justify-between text-gray-500">
          <span id="minBatCapacity">{powerCapacity}kwh</span>
          <span id="maxBatCapacity">350kwh</span>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
          Connector Types
        </label>
        <select
          class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
          name="chargingBehavior">
          <option value="teslaSupercharger">Tesla Supercharger</option>
          <option value="ccs">CCS</option>
          <option value="chademo">CHAdeMo</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
          Payment Model
        </label>
        <select
          class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
          name="chargingBehavior">
          <option value="teslaSupercharger">Subscription Based</option>
          <option value="ccs">Free</option>
          <option value="chademo">Pay-per-use</option>
        </select>
      </div>
    </div>
  )
}
