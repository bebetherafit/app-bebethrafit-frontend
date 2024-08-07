import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = body;

  if (userId) {
    // 여기에서 필요한 서버 사이드 로직을 수행할 수 있습니다.
    // 예: 세션 설정, 데이터베이스 업데이트 등

    // 성공적인 응답 반환
    return NextResponse.json({ success: true });
  } else {
    // 실패 응답 반환
    return NextResponse.json({ success: false }, { status: 400 });
  }
}