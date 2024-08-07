'use client';
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/organisms/Sidebar';

type DataRow = {
  id: string;
  timestamp: string;
  [key: string]: number | string; // value1, value2, value3 등
};

type DataDictionary = {
  [timestamp: string]: number[][];
};

const convertToDictionary = (dataArray: DataRow[]): DataDictionary => {
  return dataArray.reduce((acc, row) => {
    const { id, timestamp, ...values } = row; // id 제외
    const valueArray = Object.values(values).map((value): number => {
      const parsedValue = parseFloat(value as string);
      return isNaN(parsedValue) ? 0 : parsedValue; // 값이 숫자가 아니면 0으로 대체
    });
    if (!acc[timestamp]) {
      acc[timestamp] = [];
    }
    acc[timestamp].push(valueArray);
    return acc;
  }, {} as DataDictionary);
};

const calculateAverages = (dictionary: DataDictionary): (string | number)[][] => {
  return Object.keys(dictionary).map((timestamp) => {
    const valuesArray = dictionary[timestamp];
    const numValues = valuesArray[0].length;
    const averages = Array(numValues).fill(0);

    // 인덱스별로 평균 계산
    valuesArray.forEach(values => {
      values.forEach((value, index) => {
        averages[index] += value;
      });
    });

    for (let i = 0; i < averages.length; i++) {
      averages[i] /= valuesArray.length;
    }

    // 결과 배열의 첫 번째 원소로 timestamp 추가
    return [timestamp, ...averages];
  });
};

const VisualizationAnalysisPage: React.FC = () => {
  const [averageData, setAverageData] = useState<(string | number)[][]>([]);
  const [firstTenAverages, setFirstTenAverages] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [LCOPI, setLCOPI] = useState<number | null>(null);
  const [RCOPI, setRCOPI] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 로드
    const savedData = localStorage.getItem('averageData');
    if (savedData) {
      setAverageData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (averageData.length >= 10) {
      const firstTen = averageData.slice(0, 10);
      const numValues = firstTen[0].length - 1; // 첫 번째 원소는 timestamp
      const averages = Array(numValues).fill(0);

      for (let i = 1; i <= numValues; i++) {
        const sum = firstTen.reduce((acc, row) => acc + (row[i] as number), 0);
        averages[i - 1] = sum / firstTen.length;
      }

      setFirstTenAverages(averages);
      console.log('First Ten Averages:', averages); // firstTenAverages 콘솔에 출력
    }
  }, [averageData]);

  useEffect(() => {
    if (averageData.length > 0) {
      const lCops = averageData.map(row => row[6] as number);
      const rCops = averageData.map(row => row[7] as number);
      const lCopiAvg = lCops.reduce((acc, val) => acc + val, 0) / lCops.length;
      const rCopiAvg = rCops.reduce((acc, val) => acc + val, 0) / rCops.length;
      setLCOPI(parseFloat(lCopiAvg.toFixed(1)));
      setRCOPI(parseFloat(rCopiAvg.toFixed(1)));
      localStorage.setItem('L_COPI', lCopiAvg.toFixed(1));
      localStorage.setItem('R_COPI', rCopiAvg.toFixed(1));
    }
  }, [averageData]);

  useEffect(() => {
    // averageData가 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem('averageData', JSON.stringify(averageData));
  }, [averageData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const file = target.files?.[0];
    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    }
    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please upload a CSV file.');
      return;
    }
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map((row, index) => {
        const columns = row.split(',');
        if (index === 0 || columns[0] === "undefined" || columns.length < 2) {
          return null; // 첫 번째 줄은 헤더이므로 무시, "undefined" 행 무시, 열이 2개 미만인 행 무시
        }
        const [id, timestamp, ...values] = columns;
        const valueObj: DataRow = {
          id,
          timestamp,
          ...values.reduce((acc, val, idx) => {
            const parsedValue = parseFloat(val);
            acc[`value${idx + 1}`] = isNaN(parsedValue) ? 0 : parsedValue; // 값이 숫자가 아니면 0으로 대체
            return acc;
          }, {} as { [key: string]: number })
        };
        return valueObj;
      }).filter((row): row is DataRow => row !== null);

      const dictionary = convertToDictionary(rows);
      console.log('Parsed Data Dictionary:', dictionary); // dataDictionary 콘솔에 출력

      const averages = calculateAverages(dictionary);
      setAverageData(averages);
      console.log('Calculated Averages:', averages); // 평균 결과 콘솔에 출력
      
      setErrorMessage('');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen text-black">
      <Sidebar />
      <div className="flex-1 p-5">
        <div className="flex justify-between bg-white p-4">
          <h1 className="text-2xl font-bold">발 타입 시각화 (Visualization)</h1>
          <button className="text-green-500 flex items-center" onClick={handleButtonClick}>
            데이터 불러오기 <span className="ml-1">↓</span>
          </button>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
            ref={fileInputRef} 
          />
        </div>

        <div className="bg-white p-4 mb-8">
          <h3 className="text-center font-bold mb-2"></h3>
          {firstTenAverages.length > 0 && (
            <div className="grid grid-cols-2 w-3/5 mx-auto gap-8">
              <div className="border p-2">
                <div className="grid grid-cols-10 gap-0">
                  {firstTenAverages.slice(27, 87).map((value, idx) => {
                    const roundedValue = typeof value === 'number' ? value.toFixed(1) : value; // 소수점 첫 번째 자리에서 자름
                    const intensity = (roundedValue === '0.0') ? 0 : Math.min(Math.floor((roundedValue as unknown as number) / 15), 6); // 0은 흰색 유지
                    const backgroundColor = roundedValue === '0.0' ? 'rgba(255, 255, 255, 1)' : `rgba(255, 0, 0, ${(intensity + 1) / 7})`; // 7단계 붉은색
                    return (
                      <div key={idx} className="border px-1 py-4 text-center text-xs" style={{ backgroundColor }}>
                        {roundedValue}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="border p-2">
                <div className="grid grid-cols-10 gap-0">
                  {firstTenAverages.slice(87, 147).map((value, idx) => {
                    const roundedValue = typeof value === 'number' ? value.toFixed(1) : value; // 소수점 첫 번째 자리에서 자름
                    const intensity = (roundedValue === '0.0') ? 0 : Math.min(Math.floor((roundedValue as unknown as number) / 15), 6); // 0은 흰색 유지
                    const backgroundColor = roundedValue === '0.0' ? 'rgba(255, 255, 255, 1)' : `rgba(255, 0, 0, ${(intensity + 1) / 7})`; // 7단계 붉은색
                    return (
                      <div key={idx} className="border px-1 py-4 text-center text-xs" style={{ backgroundColor }}>
                        {roundedValue}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">발 타임 초당 시각화 (Visualization per second)</h2>
          <div className="grid grid-cols-4 gap-4">
            {averageData.slice(0, 16).map((dataRow, index) => (
              <React.Fragment key={index}>
                <div className="border p-2">
                  <h3 className="text-center font-bold mb-2">{dataRow[0]}</h3>
                  <div className="grid grid-cols-10 gap-0">
                    {dataRow.slice(28, 88).map((value, idx) => {
                      const roundedValue = typeof value === 'number' ? value.toFixed(1) : value; // 소수점 첫 번째 자리에서 자름
                      const intensity = (value === 0) ? 0 : Math.min(Math.floor((value as number) / 15), 6); // 0은 흰색 유지
                      const backgroundColor = value === 0 ? 'rgba(255, 255, 255, 1)' : `rgba(255, 0, 0, ${(intensity + 1) / 7})`; // 7단계 붉은색
                      return (
                        <div key={idx} className="border px-0 py-3 text-center text-[8px]" style={{ backgroundColor }}>
                          {roundedValue}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="border p-2">
                  <h3 className="text-center font-bold mb-2">{dataRow[0]}</h3>
                  <div className="grid grid-cols-10 gap-0">
                    {dataRow.slice(88, 148).map((value, idx) => {
                      const roundedValue = typeof value === 'number' ? value.toFixed(1) : value; // 소수점 첫 번째 자리에서 자름
                      const intensity = (value === 0) ? 0 : Math.min(Math.floor((value as number) / 15), 6); // 0은 흰색 유지
                      const backgroundColor = value === 0 ? 'rgba(255, 255, 255, 1)' : `rgba(255, 0, 0, ${(intensity + 1) / 7})`; // 7단계 붉은색
                      return (
                        <div key={idx} className="border px-0 py-3 text-center text-[8px]" style={{ backgroundColor }}>
                          {roundedValue}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white p-4">
          <div className='flex'>
          <h2 className="text-xl font-semibold mb-4">발 타입 지수 (Center of Pressure Index)</h2>
          <p className="text-gray-500 text-sm mt-2"> * 발 타입 지수는 COPI 지수로 분석합니다 </p>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-lg w-1/2 mr-2">
              <p className="text-center mb-2">왼발</p>
              <p className="text-center text-3xl font-bold">{LCOPI !== null ? LCOPI : 'Calculating...'}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg w-1/2 ml-2">
              <p className="text-center mb-2">오른발</p>
              <p className="text-center text-3xl font-bold">{RCOPI !== null ? RCOPI : 'Calculating...'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <p>이름</p>
              <p>김서우</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>생년월일</p>
              <p>2010-07-17 만 13세</p>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default VisualizationAnalysisPage;
