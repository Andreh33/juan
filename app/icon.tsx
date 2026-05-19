import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #07111A 0%, #064a40 100%)',
          color: '#bff1ea',
          fontFamily: 'serif',
          fontSize: 320,
          letterSpacing: -10,
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
