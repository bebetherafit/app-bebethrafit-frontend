// app/dashboard/page.tsx
'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/organisms/Sidebar';
import DataCard from '@/components/molecules/DataCard';
import PressureChart from '@/components/organisms/PressureChart';
import MeasurementDateSelector from '@/components/molecules/MeasurementDateSelector';
import DataViz from '@/components/organisms/DataViz';
import { useAuth } from '../context/AuthProvider';
import { collection, getDocs } from 'firebase/firestore';


const DashboardContent = () => {
  const searchParams = useSearchParams();
  const dateFromQuery = searchParams.get('date');
  
  const [currentDate, setCurrentDate] = useState(dateFromQuery || '');
  const [documentIds, setDocumentIds] = useState<string[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [diagData, setDiagData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const userUid = sessionStorage.getItem('uid');
        if (userUid) {
          try {
            const diagDateCollectionRef = collection(db, 'users', userUid, 'diagDate');
            const querySnapshot = await getDocs(diagDateCollectionRef);
            let latestDate = '';
            const ids: string[] = [];
            let currentDocData = null;

            querySnapshot.forEach((doc) => {
              const docDate = doc.id;
              ids.push(docDate);
              if (!latestDate || new Date(docDate) > new Date(latestDate)) {
                latestDate = docDate;
              }
              if (docDate === currentDate) {
                currentDocData = { id: doc.id, ...doc.data() };
              }
            });

            setDocumentIds(ids);
            if (!dateFromQuery) {
              setCurrentDate(latestDate);
              // console.log('Latest Date:', latestDate);
            }

            if (currentDocData) {
              const dataJSON = JSON.stringify(currentDocData);
              sessionStorage.setItem('diagData', dataJSON);
            }

            const storedData = sessionStorage.getItem('diagData');
            if (storedData) {
              setDiagData(JSON.parse(storedData));
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [dateFromQuery, currentDate]);
  // console.log(diagData)
  useEffect(() => {
    // console.log('Current Date:', currentDate);
  }, [currentDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!diagData) {
    return <p>No data available for the selected date.</p>;
  }

  const footPressureData = [
    { side: 'left', total: 96.12, mean: 96.12, cell: 0 },
    { side: 'right', total: 96.12, mean: 96.12, cell: 0 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <MeasurementDateSelector
          currentDate={currentDate}
          documentIds={documentIds}
        />
        <div className="grid grid-cols-2 gap-6">
          <DataCard
            title="발 압력 분포 분석"
            image="/images/foot.png"
            indexLabels={['총 압력 값', '평균 압력 값', '면적 수']}
            footPressureDistribution={[
              { side: '왼발',
                total: diagData.pressureData.totalPressure.left,
                mean: diagData.pressureData.averagePressure.left,
                cell: diagData.peakPressureData.peakPressure.left},
              { side: '오른발',
                total: diagData.pressureData.totalPressure.right,
                mean: diagData.pressureData.averagePressure.right,
                cell: diagData.peakPressureData.peakPressure.right},
            ]}
          />
          <DataCard
            title="신체 균형 분석"
            image="/images/human-bal.png"
            bodyBalance={
              { left: diagData.balanceData.left,
                right: diagData.balanceData.right,
                balance: diagData.balanceData.balance,
                direction: diagData.balanceData.direction,
                rate: diagData.balanceData.rate
              }
            }
          />
        </div>

        <div className='bg-white rounded-md'>
          <PressureChart
            title="발 총 압력 (Total Pressure)"
            data={[
              { side: 'left', total: diagData.pressureData.totalPressure.left, mean: diagData.pressureData.averagePressure.left, cell: diagData.peakPressureData.peakPressure.left },
              { side: 'right', total: diagData.pressureData.totalPressure.right, mean: diagData.pressureData.averagePressure.right, cell: diagData.peakPressureData.peakPressure.right },
            ]}
            type="total"
          />
          <PressureChart
            title="발 평균 압력 (Average Pressure)"
            data={[
              { side: 'left', total: diagData.pressureData.totalPressure.left, mean: diagData.pressureData.averagePressure.left, cell: diagData.peakPressureData.peakPressure.left },
              { side: 'right', total: diagData.pressureData.totalPressure.right, mean: diagData.pressureData.averagePressure.right, cell: diagData.peakPressureData.peakPressure.right },
            ]}
            type="mean"
          />
        </div>
        <div className="bg-white rounded-md p-4 mt-6 w-full">
          <div className='flex'>
          <DataViz
            title="발 최고 압력"
            imageUrl="/images/foot.png"
            footDirection={diagData.footDirection}
            tableData={[
              ['', '왼발'],
              ['발 최고 압력값(kPa)', diagData.peakPressureData.peakPressure.left],
              ['발 최고 압력 위치', '발 중간'],
            ]}
          />
          <DataViz
            title=""
            imageUrl="/images/foot.png"
            footDirection={diagData.footDirection}
            tableData={[
              ['', '오른발'],
              ['발 최고 압력값(kPa)', diagData.peakPressureData.peakPressure.right],
              ['발 최고 압력 위치', '발 바깥 쪽'],
            ]}
          />
          </div>
          <div className='flex'>
          <DataViz
            title="발 면적분석"
            imageUrl="/images/foot.png"
            footDirection={diagData.footDirection}
            tableData={[
              ['', '왼발'],
              ['발 면적 수 (N/10Cell)', diagData.pressureData.areaCount.left],
              ['발 면적(cm2)', diagData.peakPressureData.footArea.left],
            ]}
          />
          <DataViz
            title=""
            imageUrl="/images/foot.png"
            footDirection={diagData.footDirection}
            tableData={[
              ['', '오른발'],
              ['발 면적 수 (N/10Cell)', diagData.pressureData.areaCount.right],
              ['발 면적(cm2)', diagData.peakPressureData.footArea.right],
            ]}
          />
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardPage = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <DashboardContent />
  </Suspense>
);

export default DashboardPage;