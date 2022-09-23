import React from 'react'

export default function OpenCourse({course}) {
  return (
    <>
    {
      course === "Let's explore the sea creatures" &&
      <div>
        <div className='d-flex' style={{justifyContent:"space-between"}}>
          <div className='iframe-container'>
            <iframe src="https://go.echo3d.co/o5Vw" scrolling='no'>
            </iframe>
          </div>
          <p style={{height:"500px", width:"700px"}}>
          <h4>Whale Shark</h4>
          The whale shark (Rhincodon typus) is a slow-moving, filter-feeding carpet shark and the largest known extant fish species.
          Studies looking at vertebral growth bands and the growth rates of free-swimming sharks have estimated whale shark lifespans at 80–130 years.
          <a href='https://go.echo3d.co/o5Vw' target='blank' style={{padding:"5px", color:"white"}}>Full View in AR</a>
          </p>
        </div>
        
        <div className='d-flex' style={{justifyContent:"space-between", marginTop:"-200px"}}>
          <div className='iframe-container'>
            <iframe src="https://go.echo3d.co/BvuK" scrolling='no'>
            </iframe>
          </div>
          <p style={{height:"500px", width:"700px"}}>
          <h4>Clown Fish</h4>
          Clownfish or anemonefish are fishes from the subfamily Amphiprioninae in the family Pomacentridae. 
          Anemonefish are omnivorous and can feed on undigested food from their host anemones, and the fecal matter from the anemonefish provides nutrients to the sea anemone.
          <a href='https://go.echo3d.co/BvuK' target='blank' style={{padding:"5px", color:"white"}}>Full View in AR</a>
          </p>
        </div>

        <div className='d-flex' style={{justifyContent:"space-between", marginTop:"-200px"}}>
          <div className='iframe-container'>
            <iframe src="https://go.echo3d.co/zTKL" scrolling='no'>
            </iframe>
          </div>
          <p style={{height:"500px", width:"700px"}}>
          <h4>Manta Ray</h4>
          Manta rays are large rays belonging to the genus Mobula (formerly its own genus Manta). 
          Mantas are found in warm temperate, subtropical and tropical waters.
          They are filter feeders and eat large quantities of zooplankton, which they gather with their open mouths as they swim.
          <a href='https://go.echo3d.co/zTKL' target='blank' style={{padding:"5px", color:"white"}}>Full View in AR</a>
          </p>
          </div>
        </div> 

      // ||

      // course === "Let's explore life in the desert!" &&
      // <div>
      //    <div className='d-flex' style={{justifyContent:"space-between"}}>
      //     <div className='iframe-container'>
      //       <iframe src="https://go.echo3d.co/kAWw" scrolling='no'>
      //       </iframe>
      //     </div>
      //     <p style={{height:"500px", width:"700px"}}>
      //     <h4>Meerkat</h4>
      //     The meerkat (Suricata suricatta) or suricate is a small mongoose found in southern Africa.
      //     It is characterised by a broad head, large eyes, a pointed snout, long legs, a thin tapering tail, and a brindled coat pattern.
      //     <a href='https://go.echo3d.co/kAWw' target='blank' style={{padding:"5px", color:"white"}}>Full View in AR</a>
      //     </p>
      //   </div>
      // </div>

      // ||

      // course === "The world of ice and who else?" &&
      // <div>
      //   <div className='d-flex' style={{justifyContent:"space-between"}}>
      //     <div className='iframe-container'>
      //       <iframe src=" https://go.echo3d.co/S8N1" scrolling='no'>
      //       </iframe>
      //     </div>
      //     <p style={{height:"500px", width:"700px"}}>
      //     <h4>Penguin</h4>
      //     Penguins are a group of aquatic flightless birds.
      //     Most penguins feed on krill, fish, squid and other forms of sea life which they catch with their bills and swallow it whole while swimming. 
      //     <a href=' https://go.echo3d.co/S8N1' target='blank' style={{padding:"5px", color:"white"}}>Full View in AR</a>
      //     </p>
      //   </div>
      // </div>
    }
    </>
  )
}