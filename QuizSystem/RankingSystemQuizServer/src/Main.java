import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Main {
    static ServerSocket serverSocket = null;
    static Socket socket = null;
    public static void main(String[] args) throws IOException {
        System.out.println("Hello world!");
        int port = 21234;
        try{
            serverSocket = new ServerSocket(port);
        } catch(Exception e)
        {
            e.printStackTrace();
        }
        socket = serverSocket.accept();
        System.out.println("socket connected");
        Thread thread = new ServerThread(socket);
        thread.start();
    }

}
class ServerThread extends Thread{
    Socket socket = null;
    InputStream inputStream = null;
    OutputStream outputStream = null;
    ByteArrayInputStream byteArrayInputStream = null;
    DataInputStream dataInputStream = null;
    public ServerThread(Socket socket)
    {
        this.socket = socket;
    }
    public void run() {
        try{
            inputStream = socket.getInputStream();
            outputStream = socket.getOutputStream();
        } catch(Exception e)
        {
            e.printStackTrace();
        }
        while(true)
        {
            byte[] buffer = new byte[1000];
            try {
                inputStream.read(buffer);
                byteArrayInputStream = new ByteArrayInputStream(buffer);
                dataInputStream = new DataInputStream(byteArrayInputStream);
                int request = dataInputStream.readInt();
                System.out.println("request : "+request);
                if(request == 1)
                {
                    outputStream.write(_createByteArray("hi client"));
                }
                else {
                    outputStream.write(_createByteArray("hello client"));
                }

            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }
    }
    private byte[] _createByteArray(String message)
    {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeInt(message.getBytes(StandardCharsets.UTF_8).length);
            dataOutputStream.writeUTF(message);
        } catch(Exception e)
        {
            e.printStackTrace();
        }
        return byteArrayOutputStream.toByteArray();
    }
}