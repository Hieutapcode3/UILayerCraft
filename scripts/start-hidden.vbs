' Starts the UILayerCraft API in the background (no console window).
' Does nothing if the API already answers on /health.
Option Explicit
Dim sh, fso, root, port, http, alive
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName))
port = sh.ExpandEnvironmentStrings("%PORT%")
If port = "%PORT%" Or port = "" Then port = "18787"

alive = False
On Error Resume Next
Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.setTimeouts 1000, 1000, 1000, 1000
http.Open "GET", "http://127.0.0.1:" & port & "/health", False
http.Send
If Err.Number = 0 Then
  If http.Status = 200 Then alive = True
End If
On Error GoTo 0
If alive Then WScript.Quit 0

sh.CurrentDirectory = root
' 0 = hidden window, False = do not wait. Output goes to server.log (git-ignored).
sh.Run "cmd /c node src\server\index.js >> server.log 2>&1", 0, False
