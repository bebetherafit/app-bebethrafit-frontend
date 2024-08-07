'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { ChevronLeft, X } from 'lucide-react';

interface PressureData {
  totalPressure: { left: number, right: number },
  averagePressure: { left: number, right: number },
  areaCount: { left: number, right: number }
}

interface PeakPressureData {
  peakPressure: { left: number, right: number },
  peakPressurePosition: { left: string, right: string },
  footArea: { left: number, right: number },
  copiIndex: { left: number, right: number }
}

interface BalanceData {
  left: number,
  right: number,
  direction: string,
  rate: number,
  balance: string
}

const InputDiagDataPage = () => {
  const [pressureData, setPressureData] = useState<PressureData | null>(null);
  const [peakPressureData, setPeakPressureData] = useState<PeakPressureData | null>(null);
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 예시 데이터
    const fetchData = async () => {
      const examplePressureData: PressureData = {
        totalPressure: { left: 99.99, right: 99.99 },
        averagePressure: { left: 99.00, right: 99.00 },
        areaCount: { left: 5, right: 4 }
      };

      const examplePeakPressureData: PeakPressureData = {
        peakPressure: { left: 99.99, right: 99.99 },
        peakPressurePosition: { left: 'C7', right: 'C8' },
        footArea: { left: 99.99, right: 99.00 },
        copiIndex: { left: 99.00, right: 4.44 }
      };

      const exampleBalanceData: BalanceData = {
        left: 33.33,
        right: -33.33,
        direction: '오른쪽',
        rate: 0,
        balance: '균형'
      };

      setPressureData(examplePressureData);
      setPeakPressureData(examplePeakPressureData);
      setBalanceData(exampleBalanceData);
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // 여기에서 실제로 데이터를 저장하는 로직을 추가
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, category: 'pressure' | 'peakPressure' | 'balance', key: string, foot: 'left' | 'right') => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    if (category === 'pressure') {
      setPressureData(prev => prev && ({
        ...prev,
        [key]: {
          ...prev[key as keyof PressureData],
          [foot]: isNaN(numberValue) ? value : numberValue
        }
      }));
    } else if (category === 'peakPressure') {
      setPeakPressureData(prev => prev && ({
        ...prev,
        [key]: {
          ...prev[key as keyof PeakPressureData],
          [foot]: isNaN(numberValue) ? value : numberValue
        }
      }));
    } else if (category === 'balance') {
      setBalanceData(prev => prev && ({
        ...prev,
        [key]: isNaN(numberValue) ? value : numberValue
      }));
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className='flex border-b border-gray-500 justify-between px-60 py-3'>
        <button className='text-black'>
          <ChevronLeft />
        </button>
        <button className='text-black'>
          <X />
        </button>
      </div>

      <main className="flex-1 py-8 px-40">
        <h1 className="text-2xl text-black mb-10 ml-20">id <span className='text-gray-500'>01</span></h1>
        <div className="bg-white rounded-lg overflow-x-auto px-20">
          <h2 className="text-xl text-black mb-4">발 압력 분포 분석</h2>
          {pressureData && (
            <table className="min-w-full mb-6">
              <thead>
                <tr className="bg-gray-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center border border-gray-200" colSpan={2}>
                    <div className="flex flex-col items-center">
                      <span className="text-black">총 발 압력</span>
                      <span className="text-gray-400">(Total Pressure)</span>
                    </div>
                  </th>
                  <th className="py-3 px-6 text-center border border-gray-200" colSpan={2}>
                    <div className="flex flex-col items-center">
                      <span className="text-black">평균 발 압력</span>
                      <span className="text-gray-400">(Average Pressure)</span>
                    </div>
                  </th>
                  <th className="py-3 px-6 text-center border border-gray-200" colSpan={2}>
                    <div className="flex flex-col items-center">
                      <span className="text-black">면적 수</span>
                    </div>
                  </th>
                </tr>
                <tr className="bg-gray-100 text-black uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center border border-gray-200">왼발 (L)</th>
                  <th className="py-3 px-6 text-center border border-gray-200">오른발 (R)</th>
                  <th className="py-3 px-6 text-center border border-gray-200">왼발 (L)</th>
                  <th className="py-3 px-6 text-center border border-gray-200">오른발 (R)</th>
                  <th className="py-3 px-6 text-center border border-gray-200">왼발 (L)</th>
                  <th className="py-3 px-6 text-center border border-gray-200">오른발 (R)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={pressureData.totalPressure.left}
                        onChange={(e) => handleInputChange(e, 'pressure', 'totalPressure', 'left')}
                      />
                    ) : (
                      pressureData.totalPressure.left.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={pressureData.totalPressure.right}
                        onChange={(e) => handleInputChange(e, 'pressure', 'totalPressure', 'right')}
                      />
                    ) : (
                      pressureData.totalPressure.right.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={pressureData.averagePressure.left}
                        onChange={(e) => handleInputChange(e, 'pressure', 'averagePressure', 'left')}
                      />
                    ) : (
                      pressureData.averagePressure.left.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={pressureData.averagePressure.right}
                        onChange={(e) => handleInputChange(e, 'pressure', 'averagePressure', 'right')}
                      />
                    ) : (
                      pressureData.averagePressure.right.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        value={pressureData.areaCount.left}
                        onChange={(e) => handleInputChange(e, 'pressure', 'areaCount', 'left')}
                      />
                    ) : (
                      pressureData.areaCount.left
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        value={pressureData.areaCount.right}
                        onChange={(e) => handleInputChange(e, 'pressure', 'areaCount', 'right')}
                      />
                    ) : (
                      pressureData.areaCount.right
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          <table className="min-w-full mb-6">
            <thead>
              <tr className="bg-gray-100 text-black uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center border border-gray-200" colSpan={2}>
                  <div className="flex flex-col items-center">
                    <span className="text-black">발 최고 압력값</span>
                    <span className="text-gray-400">(Peak Pressure)</span>
                  </div>
                </th>
                <th className="py-3 px-6 text-center border border-gray-200" colSpan={2}>
                  <div className="flex flex-col items-center">
                    <span className="text-black">발 최고 압력값 위치</span>
                  </div>
                </th>
                <th className="py-3 px-6 text-center border border-gray-200" colSpan={2}>
                  <div className="flex flex-col items-center">
                    <span className="text-black">발 면적 <span className='text-gray-400'>(cm2)</span></span>
                  </div>
                </th>
                <th className="py-3 px-6 text-center border border-gray-200" colSpan={2}>
                  <div className="flex flex-col items-center">
                    <span className="text-black">COPI 지수</span>
                  </div>
                </th>
              </tr>
              <tr className="bg-gray-100 text-black uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center border border-gray-200">왼발 (L)</th>
                <th className="py-3 px-6 text-center border border-gray-200">오른발 (R)</th>
                <th className="py-3 px-6 text-center border border-gray-200">왼발 (L)</th>
                <th className="py-3 px-6 text-center border border-gray-200">오른발 (R)</th>
                <th className="py-3 px-6 text-center border border-gray-200">왼발 (L)</th>
                <th className="py-3 px-6 text-center border border-gray-200">오른발 (R)</th>
                <th className="py-3 px-6 text-center border border-gray-200">왼발 (L)</th>
                <th className="py-3 px-6 text-center border border-gray-200">오른발 (R)</th>
              </tr>
            </thead>
            {peakPressureData && (
              <tbody className="text-gray-700 text-sm font-light">
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={peakPressureData.peakPressure.left}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'peakPressure', 'left')}
                      />
                    ) : (
                      peakPressureData.peakPressure.left.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={peakPressureData.peakPressure.right}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'peakPressure', 'right')}
                      />
                    ) : (
                      peakPressureData.peakPressure.right.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="text"
                        value={peakPressureData.peakPressurePosition.left}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'peakPressurePosition', 'left')}
                      />
                    ) : (
                      peakPressureData.peakPressurePosition.left
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="text"
                        value={peakPressureData.peakPressurePosition.right}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'peakPressurePosition', 'right')}
                      />
                    ) : (
                      peakPressureData.peakPressurePosition.right
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={peakPressureData.footArea.left}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'footArea', 'left')}
                      />
                    ) : (
                      peakPressureData.footArea.left.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={peakPressureData.footArea.right}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'footArea', 'right')}
                      />
                    ) : (
                      peakPressureData.footArea.right.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={peakPressureData.copiIndex.left}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'copiIndex', 'left')}
                      />
                    ) : (
                      peakPressureData.copiIndex.left.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={peakPressureData.copiIndex.right}
                        onChange={(e) => handleInputChange(e, 'peakPressure', 'copiIndex', 'right')}
                      />
                    ) : (
                      peakPressureData.copiIndex.right.toFixed(2)
                    )}
                  </td>
                </tr>
              </tbody>
            )}
          </table>

          <h2 className="text-xl text-black mb-4">신체 균형 분석</h2>
          {balanceData && (
            <table className="min-w-full mb-6">
              <thead>
                <tr className="bg-gray-100 text-black uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center border border-gray-200">왼쪽</th>
                  <th className="py-3 px-6 text-center border border-gray-200">오른쪽</th>
                  <th className="py-3 px-6 text-center border border-gray-200">편향 방향</th>
                  <th className="py-3 px-6 text-center border border-gray-200">편향률 (%)</th>
                  <th className="py-3 px-6 text-center border border-gray-200">균형/불균형</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={balanceData.left}
                        onChange={(e) => handleInputChange(e, 'balance', 'left', 'left')}
                      />
                    ) : (
                      balanceData.left.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={balanceData.right}
                        onChange={(e) => handleInputChange(e, 'balance', 'right', 'right')}
                      />
                    ) : (
                      balanceData.right.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="text"
                        value={balanceData.direction}
                        onChange={(e) => handleInputChange(e, 'balance', 'direction', 'left')}
                      />
                    ) : (
                      balanceData.direction
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="number"
                        step="0.01"
                        value={balanceData.rate}
                        onChange={(e) => handleInputChange(e, 'balance', 'rate', 'left')}
                      />
                    ) : (
                      balanceData.rate.toFixed(2)
                    )}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {isEditing ? (
                      <input
                        className="w-full text-center border-none bg-transparent"
                        type="text"
                        value={balanceData.balance}
                        onChange={(e) => handleInputChange(e, 'balance', 'balance', 'left')}
                      />
                    ) : (
                      balanceData.balance
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-white text-black px-9 py-2 rounded mr-5 border border-gray-300" onClick={handleEdit}>수정</button>
          <button className="bg-green-500 text-white px-9 py-2 rounded" onClick={handleSave}>저장</button>
        </div>
      </main>
    </div>
  );
};

export default InputDiagDataPage;