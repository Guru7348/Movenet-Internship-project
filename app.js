const input = document.getElementById('file')
const btn = document.getElementById("btn")
btn.addEventListener("click", submit)
input.addEventListener('click',console.clear)


async function submit(e) {
    e.preventDefault()
    // console.log(input.files[0].type.slice(0,5))
    if (input.files[0].type.slice(0, 5) == "image") {
        alert("Please Wait Processing")
        const url = URL.createObjectURL(input.files[0])
        const img = new Image();
        img.src = url;
        img.onload = async function () {
            const detectorConfig = {
                modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
                enableTracking: true,
                trackerType: poseDetection.TrackerType.BoundingBox
            };
            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
            const poses = await detector.estimatePoses(img);
            console.log(poses[0].keypoints)
            alert("Keypoints are printed in console")
        }
    }
    else{
        alert("Select image file");
    }
}