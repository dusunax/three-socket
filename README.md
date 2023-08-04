# three-socket

3D rendering with webSocket!

## 구현 목표
- [x] three.js를 사용하여 3D 랜더링 구현
- [ ] react-three-fiber를 사용하여 3D 랜더링 구현
- [x] webSocket을 통해 3D 랜더링 뷰포트 공유
- [ ] webRTC을 통해 3D 랜더링 뷰포트 공유

## 작업 내용
### 📌 three.js와 typscript를 사용하여 랜더링 구현
- [socket 예제(접속자마다 cube가 추가됨, 해당 cube를 이동 및 회전)](https://sbcode.net/threejs/socketio-setup/)에 다음 내용 추가
  - (1)metariel(6 sides), plane, add some helpers to scene
  - (2)stack user's cubes(y axis)
  - (3)mini viewports(top, front, right)
  <img width="523" alt="image" src="https://github.com/dusunax/three-socket/assets/138760103/33556a0f-fe9e-4b1c-95a2-a0302232b904">

### 📌 react app initialization
- three.js와 typescript를 사용한 기존 프로젝트
- react-three-fiber와 react를 사용하도록 프로젝트 마이그레이션 시작
```
react, react-three-fiber, drei, socket.io, tailwind, react-router-dom 6.14
```

### 📌 react R3F로 마이그레이션
- react-router-dom의 createBrowserRouter사용
  - 이후에 loader 추가할 사항 찾아보기 
- useSocket.ts 커스텀훅 추가
- 폴더구조에 맞게 컴포넌트 분리
```
src
├── component
│   ├── chatRoom
│   └── threeRender
│       ├── loader
│       └── mesh
├── constant
├── hook
├── page
├── style
└── type
```

### 📌 8월 4일 작업

#### 1. 채팅창 추가
<img width="1714" alt="image" src="https://github.com/dusunax/three-socket/assets/138760103/cc52ce1b-2135-4d6c-bf5e-cdaf6415479d">

#### 2. 메시지로 mesh 변경 추가
<img width="400" alt="image" src="https://github.com/dusunax/three-socket/assets/138760103/c34c9f5e-93e7-4d32-addf-03e469253900">
<br />
<img width="400" alt="image" src="https://github.com/dusunax/three-socket/assets/138760103/2b099315-bdc4-41a3-bd16-944fcadce9f3">
<br />
<img width="400" alt="image" src="https://github.com/dusunax/three-socket/assets/138760103/61e18e3e-367c-4868-9d02-79b6fe358c74">

#### 3. 주사위 랜더 추가
- map image와 normal map 사용  
   => obj파일 load 및 mapping 이미지 수정 예정
```tsx
const textureLoader = new TextureLoader();
const diceTexture = textureLoader.load("/model/die02/diff2.png");
...
<mesh
  ...
  position={[0, positionY, 0]}
  rotation={[0, positionY % 2, 0]}
>
  <boxGeometry args={[1, 1, 1]} />
  <meshPhysicalMaterial
    color={color}
    map={diceTexture}
    normalMap={diceTexture2}
    roughness={0}
    reflectivity={1}
    metalness={0.3}
  />
</mesh>
```
<img width="736" alt="image" src="https://github.com/dusunax/three-socket/assets/138760103/84332697-3162-471e-a33e-2cef0892ff56">

