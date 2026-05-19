import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'El Refugio de A Cabana — Cocina gallega en Ferrol';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background:
            'radial-gradient(ellipse at top right, rgba(15,164,147,0.35), transparent 55%), radial-gradient(ellipse at bottom left, rgba(168,133,79,0.25), transparent 60%), #07111A',
          color: '#F1EEE6',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'monospace',
            color: '#4ED1C2',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          re.ˈfu.xjo · /n./
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 168, lineHeight: 0.95, letterSpacing: -4 }}>Refugio</div>
          <div
            style={{
              marginTop: 18,
              fontSize: 40,
              fontStyle: 'italic',
              color: '#BDB6A6',
            }}
          >
            Lugar donde se está bien.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#BDB6A6',
          }}
        >
          <span>Cocina gallega · Calle Pilar 5, A Cabana, Ferrol</span>
          <span style={{ color: '#4ED1C2' }}>659 633 047</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
