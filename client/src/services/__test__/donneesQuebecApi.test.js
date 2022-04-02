/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import quebecApiService from '../donneesQuebecApi';

it('should fetch data correctly', async () => {
  const response = await quebecApiService.getApiData();

  const result = response.data;
  const { fields } = response.data.result;
  const { records } = response.data.result;
  const numberOfRecords = response.data.result.total;
  const lastRecord = response.data.result.records[numberOfRecords - 1];

  const latestSingleData = await quebecApiService.getLatestData();

  const inspect = false;
  if (inspect) {
    console.log(response);
    console.log(result);
    // console.log(records); // very long output (800+ data)
    console.log(fields);
    console.log(lastRecord);
    console.log(numberOfRecords);
  }

  // Link is working fine
  expect(result).toBeDefined();
  expect(fields).toBeDefined();
  expect(records).toBeDefined();
  expect(lastRecord).toBeDefined();

  // Assertions
  expect(numberOfRecords).toEqual(records.length);
  expect(latestSingleData).toEqual(lastRecord);
});
