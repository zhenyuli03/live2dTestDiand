using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace live2dTest
{
    public class MainWindowViewModel:ViewModelBase
    {
        #region 成员
        private string _WebAddress;
        #endregion

        #region 属性
        public string ServerPath = Path.Combine(Environment.CurrentDirectory, "Live2dModel");
        public string WebAddress
        {
            set { _WebAddress = value;RaisePropertyChanged(); }
            get => _WebAddress;
        }
        #endregion

        #region 函数
        public MainWindowViewModel()
        {
            Task.Run(() =>
            {
                ExampleServer server = new ExampleServer("127.0.0.1", 8080);
                server.SetRoot(ServerPath);
                server.Logger = new ConsoleLogger();
                server.Start();
            });
            WebAddress = "127.0.0.1:8080";
        }
        #endregion
    }
}
