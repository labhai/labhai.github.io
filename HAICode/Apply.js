function fileInputEvent(input, labelId) {
    let label = document.getElementById(labelId)
    label.innerText = input.files[0].name
    label.style.color = '#999'
    label.style.backgroundColor = '#fdfdfd'
    label.style.border = '1px solid #ebebeb'
    label.style.borderBottomColor = '#e2e2e2'
    // let x = URL.createObjectURL(input.files[0])
    // let a = "aaaa"
    // let b = "cccc"
    // window.open(`mailto:receiver@google.com?subject=${b}&body=${a}&attachedfile=${x}`)
}
