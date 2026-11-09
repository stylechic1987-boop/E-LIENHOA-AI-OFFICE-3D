import { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import type { Group } from 'three'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Html, OrbitControls } from '@react-three/drei'
import {
  Activity, Bot, Building2, CalendarDays, CheckCircle2,
  ChevronRight, CircleDollarSign, ClipboardList, Clock3,
  GraduationCap, LayoutDashboard, MessageSquare, Users,
  Megaphone, Settings, ShieldCheck, Sparkles, Wallet
} from 'lucide-react'
import './App.css'

type Room = {
  id: string
  name: string
  department: string
  position: [number, number, number]
  color: string
  icon: string
  employees: number
  tasks: number
  description: string
}

const rooms: Room[] = [
  { id: 'director', name: 'GIÁM ĐỐC', department: 'Ban điều hành', position: [0, 0, -3.2], color: '#d5b46b', icon: '★', employees: 2, tasks: 5, description: 'Điều hành chiến lược và phê duyệt công việc toàn công ty.' },
  { id: 'marketing', name: 'MARKETING', department: 'Phòng truyền thông', position: [-5, 0, -3.2], color: '#79a8ca', icon: 'M', employees: 5, tasks: 12, description: 'Truyền thông thương hiệu, nội dung và quảng cáo.' },
  { id: 'sales', name: 'KINH DOANH', department: 'Phòng Sale', position: [5, 0, -3.2], color: '#6cba9a', icon: 'S', employees: 8, tasks: 16, description: 'Tư vấn khách hàng, tuyển sinh và phát triển thị trường.' },
  { id: 'training', name: 'ĐÀO TẠO', department: 'Phòng đào tạo', position: [-5, 0, 1.2], color: '#a88cce', icon: 'T', employees: 9, tasks: 8, description: 'Quản lý lớp học, giáo viên, chương trình và chất lượng đào tạo.' },
  { id: 'accounting', name: 'KẾ TOÁN', department: 'Phòng tài chính', position: [0, 0, 1.2], color: '#d5ae72', icon: 'K', employees: 2, tasks: 6, description: 'Theo dõi thu chi, ngân sách và báo cáo tài chính.' },
  { id: 'hr', name: 'NHÂN SỰ', department: 'Phòng nhân sự', position: [5, 0, 1.2], color: '#d18c9b', icon: 'H', employees: 3, tasks: 4, description: 'Quản lý nhân sự, tuyển dụng và đánh giá hiệu suất.' },
  { id: 'ai', name: 'AI MEETING', department: 'Phòng họp AI', position: [0, 0, 5.5], color: '#5cbed0', icon: 'AI', employees: 1, tasks: 3, description: 'Trợ lý AI phân tích, đề xuất và hỗ trợ điều hành.' },
]
function DirectorAvatar() {
  const avatarRef = useRef<Group>(null)

  const { scene, animations } = useGLTF(
    '/models/avatars/giam-doc-nam.glb'
  )

  const { actions, names } = useAnimations(animations, avatarRef)

  useEffect(() => {
    const animation = actions[names[0]]

    if (animation) {
      animation.reset().fadeIn(0.3).play()
    }

    return () => {
      animation?.fadeOut(0.2)
    }
  }, [actions, names])

  return (
    <group
      ref={avatarRef}
      position={[0, 0.13, 1.0]}
      scale={0.85}
      rotation={[0, Math.PI, 0]}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/avatars/giam-doc-nam.glb')
function OfficeRoom({ room, selected, onSelect }: {
  room: Room
  selected: boolean
  onSelect: (room: Room) => void
}) {
  const [x, , z] = room.position

  return (
    <group position={[x, 0, z]} onClick={(event) => {
      event.stopPropagation()
      onSelect(room)
    }}>
      {/* SÀN PHÒNG */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[3.7, 0.24, 3.1]} />
        <meshStandardMaterial color={selected ? '#f1e4c7' : '#e8edf0'} />
      </mesh>

      {/* VÁCH KÍNH PHÍA SAU */}
      <mesh position={[0, 1.15, -1.5]}>
        <boxGeometry args={[3.7, 1.8, 0.045]} />
        <meshPhysicalMaterial color="#b9d8e5" transparent opacity={0.22} roughness={0.12} metalness={0.15} />
      </mesh>

      {/* KHUNG KIM LOẠI PHÍA SAU */}
      {[-1.8, -0.9, 0, 0.9, 1.8].map((px) => (
        <mesh key={px} position={[px, 1.15, -1.48]}>
          <boxGeometry args={[0.055, 1.9, 0.075]} />
          <meshStandardMaterial color="#899ba7" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}

      {/* VÁCH KÍNH HAI BÊN */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 1.82, 1.05, 0]}>
            <boxGeometry args={[0.045, 1.65, 3.05]} />
            <meshPhysicalMaterial color="#b9d8e5" transparent opacity={0.2} roughness={0.12} />
          </mesh>
          <mesh position={[side * 1.82, 1.05, 0]}>
            <boxGeometry args={[0.07, 1.8, 0.07]} />
            <meshStandardMaterial color="#899ba7" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[side * 1.82, 1.05, 1.48]}>
            <boxGeometry args={[0.07, 1.8, 0.07]} />
            <meshStandardMaterial color="#899ba7" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* KHUNG CỬA RA VÀO */}
      {[-0.8, 0.8].map((px) => (
        <mesh key={px} position={[px, 1.05, 1.53]}>
          <boxGeometry args={[0.07, 1.8, 0.07]} />
          <meshStandardMaterial color="#899ba7" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
      <mesh position={[0, 1.93, 1.53]}>
        <boxGeometry args={[1.65, 0.07, 0.07]} />
        <meshStandardMaterial color="#899ba7" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* BÀN LÀM VIỆC */}
      <mesh position={[0, 0.78, -0.35]} castShadow>
        <boxGeometry args={[1.75, 0.12, 0.85]} />
        <meshStandardMaterial color="#8b674b" roughness={0.4} />
      </mesh>
      {[-0.72, 0.72].map((px) => (
        <mesh key={px} position={[px, 0.45, -0.35]} castShadow>
          <boxGeometry args={[0.09, 0.62, 0.72]} />
          <meshStandardMaterial color="#6e7d86" metalness={0.5} />
        </mesh>
      ))}

      {/* MÀN HÌNH MÁY TÍNH */}
      <mesh position={[0, 1.18, -0.58]} castShadow>
        <boxGeometry args={[0.75, 0.48, 0.07]} />
        <meshStandardMaterial color="#172b3c" metalness={0.35} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.18, -0.535]}>
        <boxGeometry args={[0.67, 0.39, 0.012]} />
        <meshBasicMaterial color="#6da9bd" />
      </mesh>
      <mesh position={[0, 0.99, -0.55]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#899ba7" metalness={0.7} />
      </mesh>

      {/* BÀN PHỤ / TỦ HỒ SƠ */}
      <mesh position={[1.25, 0.48, -0.75]} castShadow>
        <boxGeometry args={[0.48, 0.72, 0.7]} />
        <meshStandardMaterial color="#b8a48b" />
      </mesh>
      {[0.3, 0.5, 0.7].map((py) => (
        <mesh key={py} position={[1.25, py, -0.385]}>
          <boxGeometry args={[0.34, 0.025, 0.015]} />
          <meshStandardMaterial color="#765b43" />
        </mesh>
      ))}

      {/* GHẾ NHÂN VIÊN */}
      <mesh position={[0, 0.55, 0.65]} castShadow>
        <boxGeometry args={[0.58, 0.13, 0.58]} />
        <meshStandardMaterial color="#536a7a" />
      </mesh>
      <mesh position={[0, 0.95, 0.91]} castShadow>
        <boxGeometry args={[0.58, 0.68, 0.12]} />
        <meshStandardMaterial color="#536a7a" />
      </mesh>
      <mesh position={[0, 0.34, 0.65]}>
        <cylinderGeometry args={[0.045, 0.045, 0.38, 12]} />
        <meshStandardMaterial color="#899ba7" metalness={0.8} />
      </mesh>

      {/* CÂY TRANG TRÍ */}
      <mesh position={[-1.35, 0.38, 1.05]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.36, 16]} />
        <meshStandardMaterial color="#a77a53" />
      </mesh>
      <mesh position={[-1.35, 0.85, 1.05]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#4c8b68" roughness={0.8} />
      </mesh>
{/* NHÂN VẬT GIÁM ĐỐC */}
{room.id === 'director' && <DirectorAvatar />}
      {/* BIỂN TÊN PHÒNG */}
      <Html position={[0, 2.15, -1.4]} center distanceFactor={13} style={{ pointerEvents: 'none' }}>
        <div className={`room-label ${selected ? 'room-label-active' : ''}`}>
          <span style={{ background: room.color }}>{room.icon}</span>
          <strong>{room.name}</strong>
          <small>{room.employees} nhân sự</small>
        </div>
      </Html>

      {/* VIỀN PHÒNG ĐƯỢC CHỌN */}
      {selected && (
        <mesh position={[0, 0.025, 0]}>
          <boxGeometry args={[3.85, 0.025, 3.25]} />
          <meshBasicMaterial color="#d5b46b" wireframe />
        </mesh>
      )}
    </group>
  )
}
function OfficeScene({ selected, onSelect }: {
  selected: string
  onSelect: (room: Room) => void
}) {
  return (
    <Canvas shadows camera={{ position: [15, 17, 20], fov: 38 }}>
      <color attach="background" args={['#edf1f5']} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[8, 15, 10]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <planeGeometry args={[19, 15]} />
        <meshStandardMaterial color="#dce4e9" />
      </mesh>
      <gridHelper args={[19, 19, '#b9c7d0', '#d1dbe1']} position={[0, -0.06, 0]} />
      {rooms.map(room => (
        <OfficeRoom
          key={room.id}
          room={room}
          selected={selected === room.id}
          onSelect={onSelect}
        />
      ))}
      <ContactShadows position={[0, -0.04, 0]} opacity={0.25} scale={24} blur={2} />
      <OrbitControls makeDefault minDistance={12} maxDistance={32} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  )
}

function App() {
  const [activeRoom, setActiveRoom] = useState(rooms[0])
  const [activeMenu, setActiveMenu] = useState('overview')

  const menu = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'departments', label: 'Phòng ban', icon: Building2 },
    { id: 'people', label: 'Nhân sự', icon: Users },
    { id: 'tasks', label: 'Công việc', icon: ClipboardList },
    { id: 'finance', label: 'Tài chính', icon: Wallet },
    { id: 'training', label: 'Đào tạo', icon: GraduationCap },
  ]

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">LH</div>
          <div><strong>LIÊN HOA</strong><small>GLOBAL EDUCATION</small></div>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>
          {menu.map(item => {
            const Icon = item.icon
            return (
              <button key={item.id} className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => setActiveMenu(item.id)}>
                <Icon size={18} /><span>{item.label}</span>
                {activeMenu === item.id && <ChevronRight size={15} />}
              </button>
            )
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="ai-mini">
            <div className="ai-mini-icon"><Bot size={20} /></div>
            <strong>Liên Hoa AI</strong>
            <p>Trợ lý điều hành thông minh</p>
            <span><i /> Hệ thống sẵn sàng</span>
          </div>
          <button className="nav-item"><Settings size={18} /> Cài đặt hệ thống</button>
          <div className="user-profile">
            <div className="avatar">LH</div>
            <div><strong>Ban điều hành</strong><small>Quản trị viên</small></div>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div>
            <div className="breadcrumb">LIÊN HOA / <span>VĂN PHÒNG SỐ</span></div>
            <h1>Văn phòng điều hành</h1>
          </div>
          <div className="top-actions">
            <div className="system-status"><i /> Hệ thống hoạt động</div>
            <button className="icon-button"><MessageSquare size={18} /></button>
            <button className="icon-button"><CalendarDays size={18} /></button>
            <div className="avatar">LH</div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="welcome-row">
            <div><h2>Không gian làm việc số</h2><p>Toàn cảnh hoạt động Liên Hoa Global Education</p></div>
            <div className="date-chip"><Clock3 size={15} /> LIVE WORKSPACE</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon blue"><Users /></div><div><span>Tổng nhân sự</span><strong>29</strong><small>Toàn hệ thống</small></div></div>
            <div className="stat-card"><div className="stat-icon gold"><ClipboardList /></div><div><span>Công việc</span><strong>54</strong><small>Đang theo dõi</small></div></div>
            <div className="stat-card"><div className="stat-icon green"><CheckCircle2 /></div><div><span>Đã hoàn thành</span><strong>38</strong><small>Trong kỳ báo cáo</small></div></div>
            <div className="stat-card"><div className="stat-icon purple"><Activity /></div><div><span>Hiệu suất</span><strong>86%</strong><small>Chỉ số minh họa</small></div></div>
          </div>

          <div className="workspace-grid">
            <section className="office-panel">
              <div className="panel-heading">
                <div><span className="eyebrow">3D VIRTUAL ENVIRONMENT</span><h3>Mô hình văn phòng Liên Hoa</h3></div>
                <span className="live-tag"><i /> 3D VIEW</span>
              </div>
              <div className="scene-container">
                <OfficeScene selected={activeRoom.id} onSelect={setActiveRoom} />
                <div className="scene-hint">Kéo để xoay · Cuộn để phóng to · Nhấp phòng để xem</div>
              </div>
              <div className="room-legend">
                {rooms.map(room => (
                  <button key={room.id} onClick={() => setActiveRoom(room)}
                    className={activeRoom.id === room.id ? 'legend-active' : ''}>
                    <i style={{ background: room.color }} />{room.name}
                  </button>
                ))}
              </div>
            </section>

            <aside className="detail-panel">
              <div className="panel-heading"><div><span className="eyebrow">DEPARTMENT OVERVIEW</span><h3>Thông tin phòng ban</h3></div></div>
              <div className="department-card">
                <div className="department-symbol" style={{ background: activeRoom.color }}>{activeRoom.icon}</div>
                <span className="department-tag">PHÒNG BAN ĐANG CHỌN</span>
                <h2>{activeRoom.name}</h2>
                <p>{activeRoom.description}</p>
                <div className="department-metrics">
                  <div><Users size={17} /><strong>{activeRoom.employees}</strong><small>Nhân sự</small></div>
                  <div><ClipboardList size={17} /><strong>{activeRoom.tasks}</strong><small>Công việc</small></div>
                </div>
              </div>
              <div className="detail-section">
                <h4>Trạng thái hoạt động</h4>
                <div className="activity-row"><span><i className="dot-green" /> Đang hoạt động</span><strong>Trực tuyến</strong></div>
                <div className="activity-row"><span><Clock3 size={15} /> Công việc chờ xử lý</span><strong>{activeRoom.tasks}</strong></div>
              </div>
              <button className="detail-button" onClick={() => setActiveMenu('departments')}>Quản lý phòng ban <ChevronRight size={16} /></button>
            </aside>
          </div>

          <div className="bottom-grid">
            <section className="bottom-card">
              <div className="bottom-title"><h3><ClipboardList size={18} /> Công việc điều hành</h3><span>DEMO DATA</span></div>
              <div className="task-row"><div className="task-icon"><ShieldCheck size={18} /></div><div><strong>Duyệt kế hoạch hoạt động tuần</strong><small>Ban điều hành · Hôm nay</small></div><span className="task-status pending">Chờ duyệt</span></div>
              <div className="task-row"><div className="task-icon"><Megaphone size={18} /></div><div><strong>Kế hoạch tuyển sinh tháng 11</strong><small>Marketing · Hôm nay</small></div><span className="task-status progress">Đang làm</span></div>
              <div className="task-row"><div className="task-icon"><CircleDollarSign size={18} /></div><div><strong>Tổng hợp báo cáo thu chi</strong><small>Kế toán · Hôm nay</small></div><span className="task-status done">Hoàn thành</span></div>
            </section>
            <section className="bottom-card ai-card">
              <div className="bottom-title"><h3><Sparkles size={18} /> Trợ lý Liên Hoa AI</h3><span>AI ASSISTANT</span></div>
              <div className="ai-suggestion"><div className="ai-bubble"><Bot size={21} /></div><div><strong>Đề xuất điều hành</strong><p>AI có thể phân tích tiến độ công việc và đề xuất nhiệm vụ cho các phòng ban. Mọi đề xuất cần Giám đốc phê duyệt trước khi giao.</p></div></div>
              <button className="ai-action" onClick={() => setActiveRoom(rooms.find(r => r.id === 'ai')!)}>Mở phòng họp AI <ChevronRight size={16} /></button>
            </section>
          </div>
          <footer>© 2026 LIÊN HOA GLOBAL EDUCATION <span>VĂN PHÒNG SỐ · PHIÊN BẢN NỀN TẢNG</span></footer>
        </div>
      </section>
    </main>
  )
}

export default App
